import { setCampaign } from "./funcs/campaign.js"

window.addEventListener('load',()=>{
  let campaignPercentBtn = document.querySelector('#campaign-percent-btn')
  campaignPercentBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    setCampaign()
  })
  
})