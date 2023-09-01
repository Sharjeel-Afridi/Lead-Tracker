const inputBtn = document.getElementById("input-btn")
let myLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads){
    let listItems = ""
    for (let i = 0; i < leads.length; i++){
        listItems += `
        <li> 
            <a target='_blank' href = '${leads[i]}'> 
                ${leads[i]}
            </a>
        </li>`
    }
    
    ulEl.innerHTML = listItems
}

inputEl.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        event.preventDefault()
        inputBtn.click();
    }
  })

inputBtn.addEventListener("click", function() {

    const inputData = inputEl.value;
    myLeads.push(inputData)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))


    render(myLeads)
})

tabBtn.addEventListener("click", function(){
    // Get the current tab's information
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    });
    

})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

