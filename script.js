// (function() {
//     // Виведення великого попередження у консоль
//     console.log('%cЗупиніться!', 'color: red; font-size: 50px; font-weight: bold;');
//     console.log('%cЦя функція браузера призначена для розробників. Якщо хтось сказав вам щось скопіювати й сюди вставити, щоб увімкнути функцію або "зламати" чийсь обліковий запис, це шахраї. Виконавши ці дії, ви надасте їм доступ до свого облікового запису.', 'font-size: 20px; color: black;');
  
//     // Заборона введення або доступ до консолі
//     Object.defineProperty(console, '_commandLineAPI', {
//       get: function() {
//         throw 'Доступ до консолі заборонено!';
//       }
//     });
  
//     // Очищення консольних повідомлень кожну секунду
//     setInterval(function() {
//       console.clear();
//       console.log('%cЗупиніться!', 'color: red; font-size: 50px; font-weight: bold;');
//       console.log('%cЦя функція браузера призначена для розробників. Якщо хтось сказав вам щось скопіювати й сюди вставити, щоб увімкнути функцію або "зламати" чийсь обліковий запис, це шахраї. Виконавши ці дії, ви надасте їм доступ до свого облікового запису.', 'font-size: 20px; color: black;');
//     }, 1000);
//   })();


// document.addEventListener('keydown', (e) => {
//     if (e.key === 'F12') {
//         e.preventDefault();
//     }
// });

// // Блокування правого кліку
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });



addEventListener('load', (event) => {
    fetchData();
});

async function fetchData() {
    // Використовуємо HTTPS для запиту IP
    const userIP = await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .catch(error => {
            console.log('Could not find IP address', error);
            return null; // Повертаємо null у випадку помилки
        });

    // Якщо не вдалося отримати IP, виходимо з функції
    if (!userIP) return;

    // Використовуємо HTTPS для запиту до ip-api.com
    const userInfoUrl = `http://ip-api.com/json/${userIP.ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,isp,org,as,query`;

    const userInfo = await fetch(userInfoUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'
        }
    })
        .then(response => response.json())
        .catch(error => {
            console.log('Could not find user info', error);
            return null; // Повертаємо null у випадку помилки
        });

    // Якщо не вдалося отримати дані користувача, виходимо з функції
    if (!userInfo || userInfo.status !== 'success') {
        console.log('Failed to retrieve user info:', userInfo?.message || 'Unknown error');
        return;
    }

    console.log(userInfo);

    const contentElement = document.getElementById('content');

    // Створення елементів
    const h1 = document.createElement('h1');
    h1.textContent = `Твоє місце знаходження: ${userInfo.lat} ${userInfo.lon}`;

    const h3 = document.createElement('h4');
    h3.textContent = `Країна: ${userInfo.country}`;

    const h4 = document.createElement('h4');
    h4.textContent = `Код країни: ${userInfo.countryCode}`;

    const ip = document.createElement('h4');
    ip.textContent = `ВАШЕ IP: ${userIP.ip}`;

    const city = document.createElement('h4');
    city.textContent = `Місто: ${userInfo.city}`;

    const regionName = document.createElement('h4');
    regionName.textContent = `Регіон: ${userInfo.regionName}`;

    const h2 = document.createElement('h2');
    h2.textContent = `Всі твої дані було успішно відправлено анонімусу а також тобі подарунок, я скачав тобі твої дані в текстовому форматі, дякую за участь!`;

    contentElement.append(ip, h1, h3, h4, city, regionName, h2);

    // Дані для збереження в файл
    const data = `
        Місце знаходження: ${userInfo.lat}, ${userInfo.lon}
        Країна: ${userInfo.country}
        Код країни: ${userInfo.countryCode}
        Місто: ${userInfo.city}
        Регіон: ${userInfo.regionName}
    `;

    // Створюємо новий Blob з текстовими даними
    const blob = new Blob([data], { type: 'text/plain' });

    // Створюємо URL для Blob
    const url = window.URL.createObjectURL(blob);

    // Створюємо посилання для завантаження файлу
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_info.txt';  // Назва файлу

    // Додаємо посилання до тіла документа та автоматично клікаємо для завантаження
    document.body.appendChild(a);
    a.click();

    // Видаляємо посилання після завантаження
    document.body.removeChild(a);

    // Додатковий вивід для виявлення використання проксі/VPN
    if (userInfo.countryCode === 'UA') {
        contentElement.innerHTML = 'Україна';
    } else if (userInfo.proxy) {
        contentElement.innerHTML = 'А я бачу ти використовуєш VPN';
    }
}












// addEventListener('load', (event) => {

//     if (location.protocol === 'https:') {
//         location.protocol = 'http:';
//     }

//     fetchData()
// })

// async function fetchData() {
//     const userIP = await fetch('https://api.ipify.org?format=json')
//         .then(response => response.json())
//         .then(result => result)
//         .catch(error => console.log('Could not find IP address', error))

//     const userInfo = await fetch(`http://ip-api.com/json/${userIP.ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,isp,org,as,query`)
//         .then(response => response.json())
//         .then(result => result)
//         .catch(error => console.log('Could not find user info', error))
//     console.log(userInfo)

//     const contentElement = document.getElementById('content')

//     // Створення елементів
//     const h1 = document.createElement('h1')
//     h1.textContent = `Твоє місце знаходження: ${userInfo.lat} ${userInfo.lon}`

//     const h3 = document.createElement('h4')
//     h3.textContent = `Країна: ${userInfo.country}`

//     const h4 = document.createElement('h4')
//     h4.textContent = `Код країни: ${userInfo.countryCode}`

//     const ip = document.createElement('h4')
//     h4.textContent = `ВАШЕ IP: ${userIP.ip}`

//     const city = document.createElement('h4')
//     city.textContent = `Місто: ${userInfo.city}`

//     const regionName = document.createElement('h4')
//     regionName.textContent = `Регіон: ${userInfo.regionName}`

//     const h2 = document.createElement('h2')
//     h2.textContent = `Всі твої дані було успішно відправлено анонімусу а також тобі подарунок, я скачав тобі твої дані в текстовому форматі, дякую за участь!`

//     contentElement.append(ip, h1, h3, h4, city, regionName, h2)

//     // Дані для збереження в файл
//     const data = `
//         Місце знаходження: ${userInfo.lat}, ${userInfo.lon}
//         Країна: ${userInfo.country}
//         Код країни: ${userInfo.countryCode}
//         Місто: ${userInfo.city}
//         Регіон: ${userInfo.regionName}
//     `;

//     // Створюємо новий Blob з текстовими даними
//     const blob = new Blob([data], { type: 'text/plain' });

//     // Створюємо URL для Blob
//     const url = window.URL.createObjectURL(blob);

//     // Створюємо посилання для завантаження файлу
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'user_info.txt';  // Назва файлу

//     // Додаємо посилання до тіла документа та автоматично клікаємо для завантаження
//     document.body.appendChild(a);
//     a.click();

//     // Видаляємо посилання після завантаження
//     document.body.removeChild(a);

//     // Додатковий вивід для виявлення використання проксі/VPN
//     if (userInfo.countryCode === 'UA') contentElement.innerHTML = 'Україна';
//     else if (userInfo.proxy) contentElement.innerHTML = 'А я бачу ти використовуєш VPN';
// }