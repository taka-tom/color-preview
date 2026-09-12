document.addEventListener("DOMContentLoaded", () => {


  // TEXT

  document
    .querySelectorAll("[data-site]")
    .forEach((element) => {

      const key = element.dataset.site;

      if (SITE_CONFIG[key]) {

        element.textContent =
          SITE_CONFIG[key];

      }

    });


  // COLOR

  document.documentElement.style.setProperty(
    "--main-color",
    SITE_CONFIG.mainColor
  );

  document.documentElement.style.setProperty(
    "--text-color",
    SITE_CONFIG.textColor
  );

  document.documentElement.style.setProperty(
    "--accent-color",
    SITE_CONFIG.accentColor
  );


  // TITLE

  document.title =
    SITE_CONFIG.restaurantName;


  // IMAGE

  document
    .querySelectorAll("[data-image]")
    .forEach((image) => {

      const key = image.dataset.image;

      if (SITE_CONFIG[key]) {

        image.src =
          SITE_CONFIG[key];

      }

    });


  // MAP

  const map =
    document.getElementById("map");

  if (map) {

    map.src =
      `https://www.google.com/maps?q=${encodeURIComponent(
        SITE_CONFIG.mapLocation
      )}&output=embed`;

  }


  // LINK

  document
    .querySelectorAll("[data-link]")
    .forEach((link) => {

      const key = link.dataset.link;

      if (SITE_CONFIG[key]) {

        link.href =
          SITE_CONFIG[key];

      }

    });

  // PHONE

  document
    .querySelectorAll("[data-phone]")
    .forEach((phone) => {

      phone.href =
        `tel:${SITE_CONFIG.phone}`;

    });

// EMAIL

document
  .querySelectorAll("[data-email]")
  .forEach((email) => {

    email.href =
      `mailto:${SITE_CONFIG.email}`;

  });

// ADDRESS

document
  .querySelectorAll("[data-address]")
  .forEach((address) => {

    address.href =
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        SITE_CONFIG.mapLocation
      )}`;

  });


  // HAMBURGER MENU

  const menuToggle =
    document.querySelector(".menu-toggle");

  const nav =
    document.querySelector("nav");


  if (menuToggle && nav) {

    menuToggle.addEventListener(
      "click",
      () => {

        nav.classList.toggle("active");

      }
    );


    nav.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        nav.classList.remove("active");

      });

    });

}

  // RESERVATION

  const dateInput =
    document.querySelector('input[name="date"]');

  const timeSelect =
    document.getElementById("reservation-time");


  if (dateInput && timeSelect) {


    // 今日から2日後以降だけ選択可能
    const today =
      new Date();

    today.setHours(0, 0, 0, 0);


    const minDate =
      new Date(today);

    minDate.setDate(
      today.getDate() + 2
    );


    const year =
      minDate.getFullYear();

    const month =
      String(
        minDate.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        minDate.getDate()
      ).padStart(2, "0");


    dateInput.min =
      `${year}-${month}-${day}`;


    function setReservationTimes() {

      timeSelect.innerHTML =
        '<option value="">時間を選択してください</option>';


      const selectedDate =
        new Date(
          dateInput.value + "T00:00:00"
        );


      const weekDay =
        selectedDate.getDay();


      // 祝日かどうか
      const isHoliday =
        SITE_CONFIG.holidays.includes(
          dateInput.value
        );


      let startTimes = [];
      let endTimes = [];


      // 火曜日
      if (weekDay === 2) {

        // 火曜日が祝日なら営業
        if (isHoliday) {

          startTimes = ["11:00"];
          endTimes = ["21:00"];

        } else {

          timeSelect.innerHTML =
            '<option value="">定休日です</option>';

          return;

        }

      }

      // 土曜日・日曜日・祝日
      else if (
        weekDay === 0 ||
        weekDay === 6 ||
        isHoliday
      ) {

        startTimes = ["11:00"];
        endTimes = ["21:00"];

      }

      // 月・水・木・金
      else {

        startTimes = [
          "11:30",
          "17:00"
        ];

        endTimes = [
          "15:00",
          "21:00"
        ];

      }


      for (
        let i = 0;
        i < startTimes.length;
        i++
      ) {

        let [startHour, startMinute] =
          startTimes[i]
            .split(":")
            .map(Number);


        let [endHour, endMinute] =
          endTimes[i]
            .split(":")
            .map(Number);


        while (
          startHour < endHour ||
          (
            startHour === endHour &&
            startMinute < endMinute
          )
        ) {

          const option =
            document.createElement("option");


          const hour =
            String(startHour)
              .padStart(2, "0");


          const minute =
            String(startMinute)
              .padStart(2, "0");


          option.value =
            `${hour}:${minute}`;


          option.textContent =
            `${hour}:${minute}`;


          timeSelect.appendChild(
            option
          );


          startMinute += 30;


          if (startMinute >= 60) {

            startHour++;
            startMinute -= 60;

          }

        }

      }

    }


    dateInput.addEventListener(
      "change",
      setReservationTimes
    );

  }
  
// RESERVATION CONFIRM

const confirmButton =
  document.getElementById("confirm-button");

const reservationForm =
  document.querySelector(".reservation-form form");


if (confirmButton && reservationForm) {

  confirmButton.addEventListener(
    "click",
    () => {

      // 必須項目をチェック
      if (!reservationForm.checkValidity()) {

        reservationForm.reportValidity();

        return;

      }


      // 入力内容を取得
      const name =
        reservationForm.querySelector(
          '[name="name"]'
        ).value;

      const tel =
        reservationForm.querySelector(
          '[name="tel"]'
        ).value;

      const email =
        reservationForm.querySelector(
          '[name="email"]'
        ).value;

      const date =
        reservationForm.querySelector(
          '[name="date"]'
        ).value;

      const time =
        reservationForm.querySelector(
          '[name="time"]'
        ).value;

      const people =
        reservationForm.querySelector(
          '[name="people"]'
        ).value;

      const message =
        reservationForm.querySelector(
          '[name="message"]'
        ).value;


      // 確認画面
      const confirmation =
        document.createElement("div");

      confirmation.id =
        "reservation-confirmation";


      confirmation.innerHTML = `

        <div class="confirmation-box">

          <h2>ご予約内容の確認</h2>

          <p>
            <strong>お名前</strong><br>
            ${name}
          </p>

          <p>
            <strong>電話番号</strong><br>
            ${tel}
          </p>

          <p>
            <strong>メールアドレス</strong><br>
            ${email}
          </p>

          <p>
            <strong>ご希望日</strong><br>
            ${date}
          </p>

          <p>
            <strong>ご希望時間</strong><br>
            ${time}
          </p>

          <p>
            <strong>人数</strong><br>
            ${people}名
          </p>

          <p>
            <strong>その他・ご要望</strong><br>
            ${message || "なし"}
          </p>

          <button
            type="button"
            id="back-to-form"
            class="reservation-submit"
          >
            修正する
          </button>

          <button
            type="button"
            id="final-submit"
            class="reservation-submit"
          >
            この内容で送信
          </button>

        </div>

      `;


      reservationForm.style.display =
        "none";

      reservationForm.parentElement.appendChild(
        confirmation
      );


         // 修正する
        document
          .getElementById("back-to-form")
          .addEventListener("click", () => {

            confirmation.remove();

            reservationForm.style.display =
              "flex";

          });

        // 最終送信
        document
          .getElementById("final-submit")
          .addEventListener("click", () => {

            reservationForm.requestSubmit();

        });

    }
  );

}
  
  });