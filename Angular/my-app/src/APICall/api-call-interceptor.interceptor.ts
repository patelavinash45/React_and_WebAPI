import { HttpInterceptorFn } from '@angular/common/http';

export const apiCallInterceptor: HttpInterceptorFn = (req, next) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IkFBIiwiZW1haWwiOiJhYUBnbWFpbC5jb20iLCJleHAiOjE3MTg5NzI5ODQsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.ZIgh-stldPTLomPF9PzhLhrxwZSy0_FyOj3jz0x2u3Q';
  const newRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return next(newRequest);
};
