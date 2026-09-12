const colorThemes = {

  // ① ナチュラル
  natural: {
    bg: "#F7F5F0",
    text: "#3D3A34",
    accent: "#8B6F47",
    light: "#E8DFD2"
  },

  // ② 爽やか
  fresh: {
    bg: "#F4F9F8",
    text: "#29434A",
    accent: "#4C9AAA",
    light: "#DCEFF1"
  },

  // ③ シック
  chic: {
    bg: "#F4F4F4",
    text: "#222222",
    accent: "#333333",
    light: "#DDDDDD"
  },

  // ④ 和モダン
  japanese: {
    bg: "#F5F3ED",
    text: "#3F4038",
    accent: "#65745B",
    light: "#DFE4D8"
  },

  // ⑤ あたたかみ
  warm: {
    bg: "#FFF7EF",
    text: "#49382F",
    accent: "#B96F45",
    light: "#F1DFD0"
  },

  // ⑥ 高級感
  luxury: {
    bg: "#F5F3EE",
    text: "#222222",
    accent: "#9A7B3F",
    light: "#E4DCCB"
  },

  // ⑦ ミニマル
  minimal: {
    bg: "#FFFFFF",
    text: "#333333",
    accent: "#666666",
    light: "#EEEEEE"
  },

  // ⑧ カフェ
  cafe: {
    bg: "#FBF7F0",
    text: "#4A4036",
    accent: "#9A6B4F",
    light: "#E8D8C8"
  },

  // ⑨ 北欧
  nordic: {
    bg: "#F4F1EA",
    text: "#39423A",
    accent: "#7A9278",
    light: "#DDE5D9"
  },

  // ⑩ ヴィンテージ
  vintage: {
    bg: "#F3EBDD",
    text: "#493B32",
    accent: "#806044",
    light: "#DCC9AF"
  },

  // ⑪ リゾート
  resort: {
    bg: "#F2FAF8",
    text: "#31565A",
    accent: "#4C9C9A",
    light: "#D7EEEA"
  },

  // ⑫ 上品・エレガント
  elegant: {
    bg: "#FAF7F5",
    text: "#4B4145",
    accent: "#9B7180",
    light: "#EBDDE2"
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