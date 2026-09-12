const colorThemes = {

  natural: {
    bg: "#f7f5f0",
    text: "#3d3a34",
    accent: "#8b6f47",
    light: "#e8dfd2"
  },

  fresh: {
    bg: "#f4f9f8",
    text: "#29434a",
    accent: "#4c9aaa",
    light: "#dceff1"
  },

  chic: {
    bg: "#f4f4f4",
    text: "#222222",
    accent: "#333333",
    light: "#dddddd"
  },

  japanese: {
    bg: "#f5f3ed",
    text: "#3f4038",
    accent: "#65745b",
    light: "#dfe4d8"
  },

  warm: {
    bg: "#fff7ef",
    text: "#49382f",
    accent: "#b96f45",
    light: "#f1dfd0"
  },

  luxury: {
    bg: "#f5f3ee",
    text: "#222222",
    accent: "#9a7b3f",
    light: "#e4dccb"
  }

};


const buttons = document.querySelectorAll(
  ".color-buttons button"
);


buttons.forEach(button => {

  button.addEventListener("click", () => {

    // 選択中の表示
    buttons.forEach(btn => {
      btn.classList.remove("selected");
    });

    button.classList.add("selected");


    // 選択したカラー
    const colorName =
      button.dataset.color;

    const theme =
      colorThemes[colorName];


    // サイトカラーを変更
    document.documentElement.style.setProperty(
      "--bg-color",
      theme.bg
    );

    document.documentElement.style.setProperty(
      "--text-color",
      theme.text
    );

    document.documentElement.style.setProperty(
      "--accent-color",
      theme.accent
    );

    document.documentElement.style.setProperty(
      "--accent-light",
      theme.light
    );


    // 色見本を変更
    const samples =
      document.querySelectorAll(".color-sample");

    const values = [
      theme.bg,
      theme.text,
      theme.accent,
      theme.light
    ];

    samples.forEach((sample, index) => {

      sample.querySelector("span").style.backgroundColor =
        values[index];

      sample.querySelector("small").textContent =
        values[index].toUpperCase();

    });

  });

});