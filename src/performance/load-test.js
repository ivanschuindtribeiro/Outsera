import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export const options = {
  stages: [
    { duration: '30s', target: 100 }, // Rampa inicial
    { duration: '1m', target: 500 },  // Rampa até 500 VUs
    { duration: '3m', target: 500 },  // Carga sustentada (500 usuários por 3 min)
    { duration: '30s', target: 0 },    // Rampa de encerramento (Total: 5 min)
  ],
  thresholds: {
    http_req_duration: ['p(95)<1500'], // 95% das requisições abaixo de 1.5s
    http_req_failed: ['rate<0.02'],     // Erros abaixo de 2%
  },
};

export default function () {
  const url = 'http://localhost:3000/usuarios';
  const res = http.get(url);

  check(res, {
    'status code é 200': (r) => r.status === 200,
    'tempo de resposta aceitável': (r) => r.timings.duration < 1500,
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    'load-test-report.html': htmlReport(data),
  };
}