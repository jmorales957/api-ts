export type Response = {
  status: number;
  data: any;
};

export type ResponseMapper = (response: any) => Response;

export const presentResponse: (successCode?: number) => ResponseMapper = (successCode?: number) => (response: any) => ({
  data: response,
  status: successCode || 200
});
