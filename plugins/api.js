const SAMPLE_CITIES = [
  { id: '60f197849998570020506123', title: 'Оренбург' },
  { id: '60f197849998570020506124', title: 'Москва' },
  { id: '60f197849998570020506125', title: 'Санкт-Петербург' },
  { id: '60f197849998570020506126', title: 'Казань' },
  { id: '60f197849998570020506127', title: 'Екатеринбург' },
];

function rndInt(min, max) { return Math.floor(Math.random()*(max-min+1))+min; }
function rndPhone() {
  const tail = String(rndInt(1000, 9999));
  return `+79*****${tail}`;
}
function rndId() {
  return Math.random().toString(16).slice(2, 26) + Date.now().toString(16).slice(-6);
}
function rndName() {
  const names = ['Галина','Олег','Анна','Иван','Мария','Дмитрий','Екатерина','Павел','Светлана','Никита'];
  return names[rndInt(0, names.length-1)];
}
function rndTimestamp(pastDays=365) {
  const now = Date.now();
  const past = now - rndInt(0, pastDays*24*3600*1000);
  return past;
}

function makeUser(seedIndex = 0) {
  const city = SAMPLE_CITIES[rndInt(0, SAMPLE_CITIES.length-1)];
  const createdAt = rndTimestamp(400);
  const updatedAt = createdAt + rndInt(0, 200)*24*3600*1000;
  return {
    id: rndId(),
    balance: rndInt(0, 5000),
    cashbackPercent: rndInt(0, 30),
    city: { id: city.id, title: city.title },
    isBlocked: Math.random() < 0.05,
    lastSave: rndTimestamp(200),
    lastSpend: rndTimestamp(200),
    lastVisit: rndTimestamp(30),
    name: rndName(),
    phone: rndPhone(),
    role: 'customer',
    saveCount: rndInt(0, 200),
    saveTotal: rndInt(0, 50000),
    spendCount: rndInt(0, 200),
    spendTotal: rndInt(0, 50000),
    updatedAt,
    createdAt,
  };
}

const TOTAL_USERS = 8000;
const ALL_USERS = Array.from({length: TOTAL_USERS}).map((_,i)=>makeUser(i));

export default ({ app }, inject) => {
  const api = {
    users: {
      list({ offset = 0, limit = 100 } = {}) {
        const effectiveDelay = 500 + rndInt(0, 200);
        const items = ALL_USERS.slice(offset, offset + limit);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              total: TOTAL_USERS,
              items: items.map(u => ({ ...u })) // копия
            });
          }, effectiveDelay);
        });
      }
    }
  };

  inject('api', api);
};
