console.log("Page Loaded");

// const form = document.querySelector("form");
// const formPc = document.getElementById("pc-form");
// const formMonitor = document.getElementById("monitor-form");
// const formPerif = document.getElementById("periferals-form");

const hostLocation = "http://localhost";

async function handleFormSubmit(event, formId, endpoint) {
  event.preventDefault();
  console.log(`${formId} submitted`);

  const form = document.getElementById(formId);
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log(data);

  const response = await fetch(hostLocation + `:8080/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  console.log(`From the server (${endpoint}): `, responseData);
  form.reset();
}

//formPc.addEventListener("submit", handleSubmit);

document.getElementById("pc-form").addEventListener("submit", (event) => {
  handleFormSubmit(event, "pc-form", "pc");
});

document.getElementById("monitor-form").addEventListener("submit", (event) => {
  handleFormSubmit(event, "monitor-form", "monitor");
});

document
  .getElementById("periferals-form")
  .addEventListener("submit", (event) => {
    handleFormSubmit(event, "periferals-form", "periferals");
  });
