const currency_number = document.getElementById("currency_number")
const space = " "

const BCC = document.getElementById("BCC")
const TCC = document.getElementById("TCC")
const result = document.getElementById("result")

currency_number.addEventListener("input", () => {
  currency_number.value = currency_number.value.replace(/[^0-9.]/g, "")
})

async function loadSupportedCodes() {
  const response = await fetch("https://v6.exchangerate-api.com/v6/61eb5076464ef30681e7d501/codes")
  const data = await response.json()
  const supportedCodes = data.supported_codes 

  supportedCodes.forEach(code => {
    const option1 = document.createElement("option")
    option1.value = code[0] 
    option1.textContent = `${code[0]} - ${code[1]}` 
    BCC.appendChild(option1)

    const option2 = document.createElement("option")
    option2.value = code[0]
    option2.textContent = `${code[0]} - ${code[1]}`
    TCC.appendChild(option2)
  })
}

loadSupportedCodes()

async function Fetch(){
    if (!currency_number.value || !BCC.value || !TCC.value) {
        result.textContent = "Please enter amount and select both currencies."
        return
    }

    const api = `https://v6.exchangerate-api.com/v6/61eb5076464ef30681e7d501/pair/${BCC.value}/${TCC.value}`
    const response = await fetch(api)
    const data = await response.json()

    if (data.result !== "success") {
        result.textContent = "Error fetching conversion. Try again."
        return
    }

    const converted = currency_number.value * data.conversion_rate
    result.textContent = `${currency_number.value} ${BCC.value} = ${converted.toFixed(2)} ${TCC.value}`

    console.log(TCC.value, BCC.value)
    console.log(currency_number.value)
    console.log(data.base_code , space,  data.conversion_rate , space,  data.target_code , space, converted);
}

function reverse() {
    const temp = BCC.value
    BCC.value = TCC.value
    TCC.value = temp
    Fetch()
}
