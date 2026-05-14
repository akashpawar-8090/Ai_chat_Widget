(function () {
  const script = document.currentScript;

  const botId = script.getAttribute(
    "data-bot-id"
  );

  const button = document.createElement("button");

  button.innerHTML = "💬";

  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.width = "60px";
  button.style.height = "60px";
  button.style.borderRadius = "50%";
  button.style.border = "none";
  button.style.background = "black";
  button.style.color = "white";
  button.style.cursor = "pointer";
  button.style.zIndex = "999999";

  const iframe = document.createElement("iframe");

  iframe.src =
  `https://your-ai-chat.netlify.app/embed/${botId}`;

  iframe.style.position = "fixed";
  iframe.style.bottom = "90px";
  iframe.style.right = "20px";
  iframe.style.width = "380px";
  iframe.style.height = "600px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "20px";
  iframe.style.display = "none";
  iframe.style.zIndex = "999999";
  iframe.style.boxShadow =
    "0 10px 40px rgba(0,0,0,0.2)";

  button.onclick = () => {
    iframe.style.display =
      iframe.style.display === "none"
        ? "block"
        : "none";
  };

  document.body.appendChild(button);
  document.body.appendChild(iframe);
})();