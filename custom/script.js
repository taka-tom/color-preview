/* =========================
   カラー設定
========================= */

const colors = {
  bg: {
    input: document.getElementById("bgColor"),
    picker: document.getElementById("bgColorPicker"),
    sample: document.getElementById("bgSample"),
    code: document.getElementById("bgCode")
  },

  text: {
    input: document.getElementById("textColor"),
    picker: document.getElementById("textColorPicker"),
    sample: document.getElementById("textSample"),
    code: document.getElementById("textCode")
  },

  accent: {
    input: document.getElementById("accentColor"),
    picker: document.getElementById("accentColorPicker"),
    sample: document.getElementById("accentSample"),
    code: document.getElementById("accentCode")
  },

  sub: {
    input: document.getElementById("subColor"),
    picker: document.getElementById("subColorPicker"),
    sample: document.getElementById("subSample"),
    code: document.getElementById("subCode")
  }
};


/* =========================
   HEXカラー確認
========================= */

function isValidHex(value) {
  return /^#[0-9A-Fa-f]{6}$/.test(value);
}


/* =========================
   カラー反映
========================= */

function applyColor(type, value) {

  if (!isValidHex(value)) {
    return;
  }

  const root = document.documentElement;

  if (type === "bg") {
    root.style.setProperty("--bg-color", value);
  }

  if (type === "text") {
    root.style.setProperty("--text-color", value);
  }

  if (type === "accent") {
    root.style.setProperty("--accent-color", value);
  }

  if (type === "sub") {
    root.style.setProperty("--accent-light", value);
  }

  colors[type].sample.style.backgroundColor = value;
  colors[type].code.textContent = value.toUpperCase();
}


/* =========================
   カラーピッカー
========================= */

Object.keys(colors).forEach(type => {

  const item = colors[type];

  item.picker.addEventListener("input", function () {

    const value = this.value.toUpperCase();

    item.input.value = value;

    applyColor(type, value);

  });


  /* =========================
     カラーコード入力
  ========================= */

  item.input.addEventListener("input", function () {

    let value = this.value.trim();

    if (
      !value.startsWith("#") &&
      value.length === 6
    ) {
      value = "#" + value;

      this.value = value;
    }

    if (isValidHex(value)) {

      value = value.toUpperCase();

      this.value = value;

      item.picker.value = value;

      applyColor(type, value);

    }

  });

});


/* =========================
   初期カラー反映
========================= */

Object.keys(colors).forEach(type => {

  const value = colors[type].input.value;

  applyColor(type, value);

});