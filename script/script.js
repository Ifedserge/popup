const popup = selector => {
    const elems = document.querySelectorAll(selector);
    if(!elems) return;

    const show = content => {
        let popUpContainer = document.createElement('div');
        let popUpModal = document.createElement('div');
        let popUpClose = document.createElement('div');
        let popUpContent = document.createElement('div');

        popUpContainer.classList.add('popup');
        popUpModal.classList.add('popup__modal');
        popUpClose.classList.add('popup__close');
        popUpContent.classList.add('popup__content');

        popUpClose.innerHTML = `&#215`;
        popUpContent.append(content);

        popUpClose.addEventListener('click', () => popUpContainer.remove());

        popUpModal.append(popUpClose, popUpContent);
        popUpContainer.append(popUpModal);
        document.body.append(popUpContainer);
    }

    const popUpHandler = e => {
        e.preventDefault();

        let elem = e.target;
        let type = elem.dataset.type;
        console.log(elem);
        console.log(type);

        if(!type){
            let parent = elem.closest('[data-type]');

            if(!parent) return;
            type = parent.dataset.type;
            if(!type) return;
            elem = parent;
        }

        let content = '';

        if(type === 'img'){
            const href = elem.href;
            if(!href) return;
            
            let img = document.createElement('img');
            img.setAttribute('src', href);
            content = img;
        }

        if(type === 'text'){
            let text = elem.title;
            if(!text) return;
            content = text;
        }

        if(type === 'content'){
            let id = elem.dataset.id;
            if(!id) return;

            const idContent = document.getElementById(id).children[0];
            if(!idContent) return;

            content = idContent
        }

        show(content);
    }

    elems.forEach(elem => {
        elem.addEventListener('click', popUpHandler);
    });

}
popup('.container')