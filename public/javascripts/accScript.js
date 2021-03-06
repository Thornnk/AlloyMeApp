const addEventListeners = (array, mode)=>{
  for (let i=0; i<array.length; i++){
    array[i].addEventListener('click', () => {
      if (mode === 'accordion'){
        array[i].classList.toggle('accordion-active')
        const panel = array[i].nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      } else if (mode === 'user-show-edit-modal'){
        userEditModalArray[i].style.display = 'block'
      } else if (mode === 'user-show-delete-modal'){
        userDeleteModalArray[i].style.display = 'block'
      } else if (mode === 'user-hide-edit-modal'){
        userEditModalArray[i].style.display = 'none'
      } else if (mode === 'user-hide-delete-modal'){
        userDeleteModalArray[i].style.display = 'none'
      } else if (mode === 'alloy-show-edit-modal'){
        alloyEditModalArray[i].style.display = 'block'
      } else if (mode === 'alloy-show-delete-modal'){
        alloyDeleteModalArray[i].style.display = 'block'
      } else if (mode === 'alloy-hide-edit-modal'){
        alloyEditModalArray[i].style.display = 'none'
      } else if (mode === 'alloy-hide-delete-modal'){
        alloyDeleteModalArray[i].style.display = 'none'
      } else if (mode === 'alloy-add-component-form'){
        alloyFormInputDiv.innerHTML += `<input type="text" name="components" placeholder="Component name" oninput={changeInput(this)}>`
        const panel = document.querySelectorAll('.accordion-panel')[1]
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else if (mode === 'alloy-add-component-edit-modal'){
        alloyEditModalInputArray[i].innerHTML += `<input type="text" name="components" placeholder="Introduce name" oninput={changeInput(this)}>`
        alloyEditModalArray[i].style.maxHeight = alloyEditModalArray[i].scrollHeight + 'px';
      } else if (mode === 'test-show-edit-modal'){
        testEditModalArray[i].style.display = 'block'
      } else if (mode === 'test-show-delete-modal'){
        testDeleteModalArray[i].style.display = 'block'
      } else if (mode === 'test-hide-edit-modal'){
        testEditModalArray[i].style.display = 'none'
      } else if (mode === 'test-hide-delete-modal'){
        testDeleteModalArray[i].style.display = 'none'
      }
    })
  }
}

// Accordion buttons events //
const accBtnArray = document.querySelectorAll('.accordion-btn');
addEventListeners(accBtnArray, 'accordion')

// User table events //
const userEditTdBtnArray = document.querySelectorAll('.event-ap-users-edit-btn')
const userDeleteTdBtnArray = document.querySelectorAll('.event-ap-users-delete-btn')
const userEditModalArray = document.querySelectorAll('.event-ap-users-edit-modal')
const userDeleteModalArray = document.querySelectorAll('.event-ap-users-delete-modal')
addEventListeners(userEditTdBtnArray, 'user-show-edit-modal')
addEventListeners(userDeleteTdBtnArray, 'user-show-delete-modal')

// User modal events //
const closeUserEditModalBtnArray = document.querySelectorAll('.event-users-close-edit-modal-btn')
const closeUserDeleteModalBtnArray = document.querySelectorAll('.event-users-close-delete-modal-btn')
addEventListeners(closeUserEditModalBtnArray, 'user-hide-edit-modal')
addEventListeners(closeUserDeleteModalBtnArray, 'user-hide-delete-modal')

// Alloy table events //
const alloyEditTdBtnArray = document.querySelectorAll('.event-ap-alloys-edit-btn')
const alloyDeleteTdBtnArray = document.querySelectorAll('.event-ap-alloys-delete-btn')
const alloyEditModalArray = document.querySelectorAll('.event-ap-alloys-edit-modal')
const alloyDeleteModalArray = document.querySelectorAll('.event-ap-alloys-delete-modal')
addEventListeners(alloyEditTdBtnArray, 'alloy-show-edit-modal')
addEventListeners(alloyDeleteTdBtnArray, 'alloy-show-delete-modal')

// Alloy modal events //
const closeAlloyEditModalBtnArray = document.querySelectorAll('.event-alloys-close-edit-modal-btn')
const closeAlloyDeleteModalBtnArray = document.querySelectorAll('.event-alloys-close-delete-modal-btn')
const alloyEditModalAddComponentBtnArray = document.querySelectorAll('.event-ap-alloys-edit-modal-add-component-btn')
const alloyEditModalInputArray = document.querySelectorAll('.event-alloys-edit-modal-input')
addEventListeners(closeAlloyEditModalBtnArray, 'alloy-hide-edit-modal')
addEventListeners(closeAlloyDeleteModalBtnArray, 'alloy-hide-delete-modal')
addEventListeners(alloyEditModalAddComponentBtnArray, 'alloy-add-component-edit-modal')

// Alloy form events//
const alloyAddComponentFormBtn = [document.querySelector('#event-ap-alloys-add-component-form-btn')]
const alloyFormInputDiv = document.querySelector('#ap-alloys-form-input-div')
addEventListeners(alloyAddComponentFormBtn, 'alloy-add-component-form')

// Modal form functionality //
const submitEditForm = (event)=>{
  const id = event.target.getAttribute('data')
  const inputsDiv = document.getElementsByClassName(id)[0]
  const inputsDivChildren = inputsDiv.querySelectorAll("*")
  let alloyName = ''
  const components = []
  inputsDivChildren.forEach((input)=>{
    if(input.getAttribute('name') === 'alloyName'){
      alloyName = input.getAttribute('value')
    } else if(input.getAttribute('name') === 'components'){
      components.push(input.getAttribute('value'))
    }
  })
  const fakeBody = {alloyName, components}
  axios({
    method: 'POST',
    url: '/alloy/edit/' + id,
    data: fakeBody
  })
  .then((result)=>{
    location.reload()
  })
  .catch((err)=>{
    console.log(err)
  })
}
const changeInput = (thisInput)=>{
  thisInput.setAttribute('value', thisInput.value)
}

// Test table events //
const testEditTdBtnArray = document.querySelectorAll('.event-ap-tests-edit-btn')
const testDeleteTdBtnArray = document.querySelectorAll('.event-ap-tests-delete-btn')
const testEditModalArray = document.querySelectorAll('.event-ap-tests-edit-modal')
const testDeleteModalArray = document.querySelectorAll('.event-ap-tests-delete-modal')
addEventListeners(testEditTdBtnArray, 'test-show-edit-modal')
addEventListeners(testDeleteTdBtnArray, 'test-show-delete-modal')

// Test modal events //
const closeTestEditModalBtnArray = document.querySelectorAll('.event-tests-close-edit-modal-btn')
const closeTestDeleteModalBtnArray = document.querySelectorAll('.event-tests-close-delete-modal-btn')
addEventListeners(closeTestEditModalBtnArray, 'test-hide-edit-modal')
addEventListeners(closeTestDeleteModalBtnArray, 'test-hide-delete-modal')