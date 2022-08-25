changeForm()
{
    let select = document.getElementById('emi');
    let option = select.options[select.selectedIndex].value;

    console.log(option);
}