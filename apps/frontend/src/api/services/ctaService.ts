import axiosClient from "../axiosClient";

interface CTASubmitRequest {
  email: string;
}

export const ctaService = {
  submit: async (data: CTASubmitRequest): Promise<void> => {
    await axiosClient.post("/api/cta/submit", data);
  },
};
