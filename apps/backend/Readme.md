Общий подход к архитектуре 1. Разделение на высокоуровневые доменные модули: каждый отвечает за свою логику и хранит минимально необходимую информацию о других модулях. Например, у нас есть модули Game, User, Role, Vote, Chat, GameLogic, Realtime, Analytics. 2. Использование Redis для «живого» состояния:
• Настоящая игровая сессия (текущее состояние партий, таймеры, временные данные) лежит в Redis.
• PostgreSQL (через Supabase) служит для персистентного хранения (пользователи, окончательные логи партии, результаты). 3. Событийная модель и Pub/Sub:
• В идеале модули обмениваются сообщениями не напрямую, а через внутреннюю шину событий (Nest EventEmitter или продвинутые решения типа Nats/Kafka — в зависимости от масштабов).
• Это позволит вам легко подписываться на ключевые события (например, окончание голосования, смена фазы, убийство игрока) из других модулей без сильной связанности. 4. Фазы игры как конечный автомат:
• Игровые фазы (день, голосование, ночь) удобно описывать в терминах state machine.
• Переход между фазами (transition) связан с вызовом сервисов других модулей (проверка результатов голосования, ночных действий, ролевых способностей и т.д.). 5. Безопасность и валидация:
• NestJS Guards + JWT для аутентификации.
• Дополнительные механизмы контроля (rate limit, проверка таймера фазы), чтобы избежать спама действий.

Структура каталогов в NestJS

Предположим, что у нас есть стандартный раздел в src/modules, где каждый модуль имеет контроллер, сервис, entity (или schema), gateway (для WebSocket), dto и т.д.

src/
app.module.ts
main.ts
modules/
user/
user.controller.ts
user.service.ts
user.module.ts
user.entity.ts
game/
game.controller.ts
game.service.ts
game.module.ts
game.entity.ts
role/
role.service.ts
role.module.ts
role.entity.ts
roles/
index.ts (импорт всех реализаций)
hacker.ts
...
voting/
voting.controller.ts
voting.service.ts
voting.module.ts
vote.entity.ts
chat/
chat.gateway.ts
chat.service.ts
chat.module.ts
chat-message.entity.ts
game-logic/
game-logic.service.ts
game-logic.module.ts
realtime/
realtime.gateway.ts
realtime.module.ts
analytics/
analytics.service.ts
analytics.module.ts
...
shared/
utils/
constants/
...

1. UserModule
   • Entity/User: user.entity.ts

@Entity()
export class User {
@PrimaryGeneratedColumn()
id: number;

@Column({ unique: true })
username: string;

@Column()
passwordHash: string;

@Column({ default: true })
isAlive: boolean;

@Column({ nullable: true })
currentGameId?: string; // Связь, если пользователь в игре

// Поля вроде роли могут устанавливаться динамически в game-logic
}

    •	UserService:
    •	Регистрация и хеширование пароля.
    •	Авторизация (JWT).
    •	Методы joinGame(gameId, userId), если нужно связать пользователя с игрой.
    •	UserController:
    •	POST /register, POST /login
    •	Возможный эндпоинт GET /me для получения инфо о текущем пользователе.

2. GameModule
   • Entity/Game: хранит общие метаданные по партии.

@Entity()
export class Game {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column()
phase: string; // 'DAY' | 'VOTING' | 'NIGHT' и т.п.

// Список игроков можно хранить в отдельной связи "GamePlayers" 
// (в зависимости от того, где удобнее)
}

    •	GameService:
    •	Методы: createGame(...), joinGame(...), startGame(...).
    •	При startGame() вызываем логику распределения ролей (RoleModule).
    •	Состояние партии при игре (кто жив, фаза, таймеры) лучше всего хранить в Redis, а в Postgres — только метаданные (когда создана, итог результата и т.п.).
    •	GameController:
    •	POST /game/create, POST /game/join, POST /game/start, GET /game/state.

3. RoleModule
   • Зачем нужен:
   • Содержит описание всех возможных ролей и их механик.
   • При startGame мы случайно или по сложному алгоритму назначаем роли игрокам.
   • Структура:
   • Можно сделать классы-стратегии (например, HackerRole, DetectiveRole), которые имплементируют общий интерфейс executeNightAction(), onPhaseStart(), onPlayerDeath() и т.п.
   • Внутри RoleService регистрируем эти классы в массиве или словаре.

export interface RoleAction {
executeNightAction(context: NightActionContext): NightActionResult;
...
}

    •	Хранение ролей:
    •	У игрока просто хранится roleName. В ходе ночных фаз RoleService находит класс, ответственный за эту роль, и вызывает нужную логику.

4. VotingModule
   • Vote.entity:

@Entity()
export class Vote {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column()
gameId: string;

@Column()
voterId: number;

@Column({ nullable: true })
targetId?: number; // За кого голосует

@Column()
phase: string; // Чтобы различать голосование по фазам
}

    •	VotingService:
    •	submitVote(voterId, targetId, gameId) – проверяем, что игрок в правильной фазе, жив, не голосовал ранее, и т.д.
    •	countVotes(gameId, phase) – подсчитываем результаты, учитываем «способности» (можно вызывать RoleModule, если есть фальсификаторы).
    •	Результат голосования публикуем через RealtimeModule (событие vote:result).
    •	VotingController:
    •	POST /vote — отправка голоса.

5. ChatModule
   • ChatMessage.entity:

@Entity()
export class ChatMessage {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column()
gameId: string;

@Column()
senderId: number;

@Column()
content: string;

@CreateDateColumn()
createdAt: Date;
}

    •	ChatGateway (WebSocket)**:
    •	Канал чата: chat:new_message и т.п.
    •	При получении сообщения — сохраняем в БД (или Redis, если хотим сделать «живую» историю), затем рассылаем другим.
    •	Специфика «социальной дедукции»:
    •	Роли могут «взламывать» или «подслушивать» приватные чаты.
    •	Проверка прав доступа к чатам происходит в ChatService или в Guard на уровне ChatGateway.

6. GameLogicModule
   • GameLogicService:
   • «Оркестрирует» фазы и события.
   • Пример жизненного цикла:

   1. Переход в фазу «День»: игроки обсуждают, чат открыт для всех.
   2. Переход в фазу «Голосование»: открываем/закрываем голосование, собираем голоса (VotingModule).
   3. Переход в фазу «Ночь»: вызываем RoleModule для ночных действий, определяем, кто был убит/защищён. Сохраняем результат.
      • Управляет таймерами. Например, каждая фаза длится N секунд; таймер можно хранить в Redis, чтобы в случае масштабирования сервера логика не зависела от конкретного инстанса.
      • После окончания партии — записываем результат в GameService (Postgres), возможно вызываем AnalyticsModule.

7. RealtimeModule
   • RealtimeGateway (через @WebSocketGateway NestJS или Socket.io нативно):
   • События:
   • game:update — обновление общего состояния (кто жив, какая фаза, и т.д.).
   • vote:result — итоги голосования.
   • chat:new*message — новое сообщение в чате.
   • game:phase_change — переход фазы.
   • Можно хранить разные комнаты (например, room*<gameId>), чтобы рассылка была только тем, кто участвует в конкретной игре.

8. AnalyticsModule
   • AnalyticsService:
   • Подписывается на события game:end (когда игра заканчивается) и собирает статистику: кто выиграл, сколько ходов, какие роли и т.д.
   • Данные сохраняются в аналитические таблицы (либо сразу в Postgres, либо в отдельное хранилище).
   • В будущем можно расширить: хранить историю ходов, делать графы «кто на кого голосовал» и т.п.

Логика «живого» состояния (Redis vs Postgres) 
1. Redis:
• Данные, которые часто обновляются: кто жив, какие у кого роли, сколько осталось времени до конца фазы.
• Обращение к Redis очень быстрое, что снижает нагрузку на Postgres.
• При завершении игры информация «фризится» и окончательные результаты пишутся в Postgres.
 2. Postgres:
• Данные, которые нужны для долгосрочного хранения: пользователи, «сколько сыграно игр», история голосований, чат-сообщения (если хочется анализировать потом).
• Также всё, что важно не потерять в случае сбоя Redis.

Поток фазы игры (пример) 1. startGame:
• Создаём запись Game в Postgres.
• Разбрасываем роли игрокам, сохраняем roleName для каждого игрока (в Redis и/или в Postgres).
• Устанавливаем фазу «День» и таймер, скажем, 2 минуты.
• Отправляем событие game:phase_change через RealtimeGateway. 2. phase: DAY:
• Игроки общаются в общем чате.
• По истечении времени или по принудительному триггеру (все готовы) переходим к фазе «Голосование». 3. phase: VOTING:
• Открывается VotingModule.
• Игроки отправляют голоса через POST /vote или через WebSocket-событие (зависит от реализации).
• Храним голоса в Redis или в Postgres для надёжности.
• По истечении таймера (или когда все проголосовали) считаем голоса.
• Учитываем роль-фальсификатор (если есть), поправляем результаты, объявляем итоги в vote:result. 4. Переход к phase: NIGHT:
• Вызываем RoleModule и GameLogicModule для исполнения ночных действий (убийства, защита и т.д.).
• Применяем результаты: кто-то выбывает (isAlive = false), кому-то меняем статус.
• Сохраняем в Redis и/или Postgres результат ночи.
• По завершении — новое событие game:phase_change. 5. Повтор циклов до конца игры (когда условие победы достигнуто: все угрозы уничтожены или перевес какой-то команды). 6. game:end:
• Сохраняем финальное состояние в Postgres (победившая сторона, время).
• Вызываем AnalyticsModule, где сохраняем всю нужную статистику.
• Удаляем или архивируем Redis-данные.

Баланс и безопасность
• JWT: для каждого запроса к REST и при установке соединения по Socket.io.
• Проверка фазы: нельзя голосовать ночью, нельзя применять ночные действия днём. Это логика внутри VotingService и RoleService, которую проще сделать через Guards или проверки в сервисах.
• Защита от спама/дублирования: Redis-ключи «user_voted_in_phase» или счётчики действий.
• Логирование: все ключевые события (создание игры, голос, убийство) пишутся в логи (например, в отдельную таблицу Postgres или в сервис типа Sentry/ELK).

Пример взаимодействия модулей 1. Игрок жмёт «Присоединиться к игре»
• UserController проверяет, что он залогинен.
• GameService.joinGame(gameId, userId) связывает пользователя с игрой.
• RealtimeGateway отсылает событие game:update для обновления списка игроков в лобби. 2. Игра стартует
• GameController.startGame() -> GameService.startGame() -> GameLogicService.startGameFlow().
• GameLogicService назначает роли через RoleModule.
• Новый фазовый таймер -> событие через RealtimeGateway. 3. Голосование
• Игрок вызывает POST /vote (targetId=XYZ).
• VotingService проверяет фазу, регистрирует голос.
• По истечении таймера (Redis) VotingService.countVotes() -> событие vote:result. 4. Ночная фаза
• GameLogicService вызывает RoleModule для сбора ночных действий.
• Каждая роль может вызывать отдельный метод (например, actionService.registerNightAction(...)).
• После истечения ночного таймера – обрабатываем все действия по порядку приоритетов (убийство/защита/обман/сканирование).
• Обновляем Redis-состояние игры (кто жив, кто нет), логируем событие.
• Событие game:phase_change => DAY. 5. Завершение игры
• Условие (например, в одной из команд остался 1+ игрок, а в другой 0).
• GameLogicService вызывает AnalyticsModule, сохраняет финал в Postgres.
• RealtimeGateway — game:end.

Вывод

Такая структура:
• Делит логику на доменные модули.
• Использует Redis как скоростное in-memory хранилище состояний, а Postgres — как «истину».
• Обеспечивает гибкую работу с фазами через GameLogic + RoleModule.
• Легко масштабируется за счёт событийного подхода (каждый модуль реагирует на события).
• Обеспечивает удобную поддержку реального времени (Socket.io) через отдельный модуль RealtimeModule.
• Позволяет добавлять аналитику и новые роли без «ломания» текущей архитектуры — достаточно расширить RoleModule и подписаться на нужные события.

При необходимости это всё можно дополнить:
• Domain-driven design (DDD) – более «тяжеловесный» вариант, но с чёткой моделью Aggregate Root для Game и User.
• Микросервисный подход – если планируется очень большая нагрузка (разделить на несколько сервисов: чат отдельно, логика голосования отдельно и т.д.).

Но для начала (MVP + первая рабочая версия) монолит в NestJS с грамотно разделёнными модулями и подключением Redis/Postgres — обычно самое простое, надёжное и при этом гибкое решение.

Надеюсь, такой взгляд на архитектуру поможет структурировать проект и учесть особенности жанра «социальной дедукции». Если нужно больше деталей по коду, тестированию или конкретным паттернам (strategy, state machine), — не стесняйся уточнять!
