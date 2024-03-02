
// Put code within the curly brackets of this line if u need the js to execute after document is fully loaded
document.addEventListener('DOMContentLoaded', ()=>{});

// keep this or delete. they are expendable ahahaa
const button = document.getElementById('submit');

button.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(event);
});
