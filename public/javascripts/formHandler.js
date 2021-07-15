window.addEventListener('DOMContentLoaded', async(event) => {
    let inputs = document.querySelectorAll('input');
    let checkDiv = document.getElementById('checkbox')
    let radioDiv = document.getElementById('radio')
    let colorDiv = document.getElementById('color')
    let rangeDiv = document.getElementById('range')

    inputs.forEach(input => {
        input.addEventListener('change', event => {

            switch(event.target.type){
                case 'checkbox':
                    if (event.target.checked) {
                        let checkInfo = `<p id="${event.target.value}">${event.target.value}</p>`;
                        checkDiv.innerHTML = checkDiv.innerHTML + checkInfo;
                    } else {
                        let removeThis = document.getElementById(event.target.value)
                        removeThis.remove();
                    }
                    break
                case 'radio':
                     let radioInfo = `<p>${event.target.value}</p>`;
                     radioDiv.innerHTML = radioInfo;
                     break
                case 'color':
                    let colorInfo = event.target.value;
                    let colorBlock = `
                        <div style="height:100px;width:50%;background-color:${colorInfo};"></div>
                    `;
                    colorDiv.innerHTML = colorBlock;
                    break
                case 'range':
                    let rangeInfo = `<p>${event.target.value}</p>`
                    rangeDiv.innerHTML = rangeInfo;
                    break
                default:
                    console.log('No event')
            };
        });
    });
});