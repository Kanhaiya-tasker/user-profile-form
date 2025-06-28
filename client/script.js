const form = document.getElementById("multiStepForm");
const steps = document.querySelectorAll(".form-step");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");
let currentStep = 0;

function showStep(index) {
  steps.forEach((step, i) => {
    step.style.display = i === index ? "block" : "none";
  });
  prevBtn.style.display = index > 0 ? "inline-block" : "none";
  nextBtn.style.display = index < steps.length - 1 ? "inline-block" : "none";
  submitBtn.style.display =
    index === steps.length - 1 ? "inline-block" : "none";
}

showStep(currentStep);

nextBtn.addEventListener("click", () => {
  if (validateStep(currentStep)) {
    currentStep++;
    if (currentStep === steps.length - 1) {
      fillSummary();
    }
    showStep(currentStep);
  }
});

prevBtn.addEventListener("click", () => {
  currentStep--;
  showStep(currentStep);
});
function validateStep(step) {
  const inputs = steps[step].querySelectorAll("input, select");
  for (let input of inputs) {
    if (!input.checkValidity()) {
      alert(`Please fill out: ${input.name || input.id}`);
      return false;
    }
  }

  // Password check (step 1)
  if (step === 0) {
    const newPassword = document.getElementById("newPassword").value;
    if (newPassword && !/(?=.*\d)(?=.*[!@#$%^&*]).{8,}/.test(newPassword)) {
      alert(
        "New password must be at least 8 chars, include 1 number & 1 special char."
      );
      return false;
    }
  }

  return true;
}
const profilePhoto = document.getElementById("profilePhoto");
const photoPreview = document.getElementById("photoPreview");

profilePhoto.addEventListener("change", () => {
  const file = profilePhoto.files[0];
  if (!file) return;

  const validTypes = ["image/jpeg", "image/png"];
  if (!validTypes.includes(file.type) || file.size > 2 * 1024 * 1024) {
    alert("Invalid file. Only JPG/PNG and max 2MB allowed.");
    profilePhoto.value = "";
    photoPreview.style.display = "none";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    photoPreview.src = reader.result;
    photoPreview.style.display = "block";
  };
  reader.readAsDataURL(file);
});
const username = document.getElementById("username");
const usernameStatus = document.getElementById("usernameStatus");

username.addEventListener("blur", async () => {
  const val = username.value.trim();
  if (val.length >= 4 && val.length <= 20 && !val.includes(" ")) {
    const res = await fetch(
      `https://user-profile-form-4.onrender.com/check-username?username=${val}`
    );
    const data = await res.json();
    if (data.available) {
      usernameStatus.textContent = "✅ Available";
      usernameStatus.style.color = "green";
    } else {
      usernameStatus.textContent = "❌ Taken";
      usernameStatus.style.color = "red";
    }
  } else {
    usernameStatus.textContent = "❗ Invalid";
    usernameStatus.style.color = "orange";
  }
});
const newPassword = document.getElementById("newPassword");
const passwordStrength = document.getElementById("passwordStrength");

newPassword.addEventListener("input", () => {
  const val = newPassword.value;
  let score = 0;
  if (val.length >= 8) score++;
  if (/\d/.test(val)) score++;
  if (/[!@#$%^&*]/.test(val)) score++;

  const levels = ["Weak", "Medium", "Strong"];
  const colors = ["red", "orange", "green"];
  passwordStrength.textContent = val ? levels[score - 1] || "Very Weak" : "";
  passwordStrength.style.color = val ? colors[score - 1] || "red" : "";
});
const profession = document.getElementById("profession");
const companyDetails = document.getElementById("companyDetails");

profession.addEventListener("change", () => {
  if (profession.value === "Entrepreneur") {
    companyDetails.style.display = "block";
  } else {
    companyDetails.style.display = "none";
    document.getElementById("companyName").value = "";
  }
});
function fillSummary() {
  const summary = document.getElementById("summaryContent");
  const formData = new FormData(form);
  let html = "";
  for (const [key, value] of formData.entries()) {
    if (key === "profilePhoto") continue;
    html += `<p><strong>${key}:</strong> ${value}</p>`;
  }
  summary.innerHTML = html;
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const res = await fetch(
    "https://user-profile-form-4.onrender.com/submit-profile",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  alert(data.message);
  if (data.success) {
    form.reset();
    location.reload();
  }
});
const countrySelect = document.getElementById("country");
const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");

async function fetchCountries() {
  const res = await fetch("https://user-profile-form-4.onrender.com/countries");
  const countries = await res.json();
  countrySelect.innerHTML = `<option value="">--Select Country--</option>`;
  countries.forEach((country) => {
    countrySelect.innerHTML += `<option value="${country}">${country}</option>`;
  });
}

countrySelect.addEventListener("change", async () => {
  const country = countrySelect.value;
  stateSelect.innerHTML = `<option value="">--Select State--</option>`;
  citySelect.innerHTML = `<option value="">--Select City--</option>`;

  if (!country) return;

  const res = await fetch(
    `https://user-profile-form-4.onrender.com/states/${country}`
  );
  const states = await res.json();
  states.forEach((state) => {
    stateSelect.innerHTML += `<option value="${state}">${state}</option>`;
  });
});

stateSelect.addEventListener("change", async () => {
  const state = stateSelect.value;
  citySelect.innerHTML = `<option value="">--Select City--</option>`;
  if (!state) return;

  const res = await fetch(
    `https://user-profile-form-4.onrender.com/cities/${state}`
  );
  const cities = await res.json();
  cities.forEach((city) => {
    citySelect.innerHTML += `<option value="${city}">${city}</option>`;
  });
});

// Fetch countries on page load
fetchCountries();
