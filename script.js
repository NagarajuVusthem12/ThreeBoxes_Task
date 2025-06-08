
document.addEventListener("DOMContentLoaded", () => {
    // Get all bundle options in a variable 
    const bundleOptions = document.querySelectorAll(".bundle-option")
    const radioButtons = document.querySelectorAll('input[type="radio"]')
    const addToCartBtn = document.querySelector(".add-to-cart-btn")
  
    // Initialize with the first option selected
    updateSelection(document.querySelector('input[type="radio"]:checked').value)
  
    // Adding event listeners to radio buttons
    radioButtons.forEach((radio) => {
      radio.addEventListener("change", function () {
        updateSelection(this.value)
      })
    })
  
    // Adding event listeners to bundle option containers using forEach loop
    bundleOptions.forEach((option) => {
      option.addEventListener("click", function (e) {

        // Don't trigger if clicking on a select element okk this functionality I kept
        if (e.target.tagName === "SELECT") return
  
        const radioId = "option" + this.dataset.option
        document.getElementById(radioId).checked = true
  
        // Trigger the change event manually
        const event = new Event("change")
        document.getElementById(radioId).dispatchEvent(event)
      })
    })
  
    // Adding to cart button animation code
    addToCartBtn.addEventListener("click", function () {
      this.classList.add("clicked")
  
      // Show success message or perform other actions when added to cart
      setTimeout(() => {
        alert("Items added to cart!")
        this.classList.remove("clicked")
      }, 300)
    })
  
    // Function to update selection written below
    function updateSelection(optionValue) {
      bundleOptions.forEach((option) => {
        option.classList.remove("selected")
        const details = option.querySelector(".option-details")
        if (details) {
          details.classList.add("hidden")
        }
      })
  
      // Adding selected class to the chosen option 
      const selectedOption = document.querySelector(`.bundle-option[data-option="${optionValue}"]`)
      selectedOption.classList.add("selected")
  
      // Showing details for the selected option
      const details = selectedOption.querySelector(".option-details")
      if (details) {
        details.classList.remove("hidden")
      }
  
      // Updating total price based on selection
      updateTotalPrice(optionValue)
    }
  
    // Function to update total price 

    function updateTotalPrice(optionValue) {
      let totalPrice
  
      switch (optionValue) {
        case "1":
          totalPrice = "$10.00 USD"
          break
        case "2":
          totalPrice = "$18.00 USD"
          break
        case "3":
          totalPrice = "$24.00 USD"
          break
        default:
          totalPrice = "$10.00 USD"
      }
  
      document.querySelector(".total").textContent = `Total: ${totalPrice}`
    }
  
    createOptionDetails(2, 2)
    createOptionDetails(3, 3)
  
    // Function to create option details
    
    function createOptionDetails(optionNumber, pairCount) {
      const optionDetails = document.querySelector(`.bundle-option[data-option="${optionNumber}"] .option-details`)
  
      let detailsHTML = `
              <div class="selector-labels">
                  <div class="label">Size</div>
                  <div class="label">Colour</div>
              </div>
          `
  
      for (let i = 1; i <= pairCount; i++) {
        detailsHTML += `
                  <div class="selector-row">
                      <div class="selector-number">#${i}</div>
                      <select class="size-selector">
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                      </select>
                      <select class="color-selector">
                          <option value="black">Black</option>
                          <option value="white">White</option>
                          <option value="blue">Blue</option>
                          <option value="red">Red</option>
                      </select>
                  </div>
              `
      }
  
      optionDetails.innerHTML = detailsHTML
    }
  })
  
  
