const gallery = (function () {

    const GALLERY = document.querySelector(".gallery__container")
    const FOCUSED_IMAGE = document.createElement("img")

    FOCUSED_IMAGE.classList.add("gallery__focusedImage")

    const THUMBNAILS = document.createElement("div")
    THUMBNAILS.classList.add("gallery__thumbnails")


    const ZOOMED_IMAGE_DIV = document.createElement("div")
    const ZOOMED_IMAGE = document.createElement("img")
    ZOOMED_IMAGE_DIV.append(ZOOMED_IMAGE)
    ZOOMED_IMAGE_DIV.style.display = "none"
    ZOOMED_IMAGE_DIV.classList.add("gallery__zoomedImageContainer")
    ZOOMED_IMAGE.classList.add("gallery__zoomedImage")




    function buildThumbnail(image) {
        const BUTTON = document.createElement("button")
        BUTTON.addEventListener("click", changeFocus)
        BUTTON.addEventListener("mouseover", changeFocus)
        BUTTON.innerHTML = `<img src="${image}" alt="gallery miniature"class="gallery__thumbnail">`
        BUTTON.classList.add("gallery__button")
        THUMBNAILS.append(BUTTON)

    }

    function changeFocus(event) {
        if (event.target.matches(".gallery__thumbnail")) {
            FOCUSED_IMAGE.src = event.target.src;
        }
    }



    //Vi trigger zoom funktionen ved mouse over
    FOCUSED_IMAGE.addEventListener("mouseover", zoom)

    function zoom(event) {
        //Flere mouse-eventlyttere. Hvis vi tilføjer
        //lyttere inde i en funktion som trigges igen og igen
        //er det god praksis at fjerne dem igen.
        //det gør vi i stopZoom() 
        FOCUSED_IMAGE.addEventListener("mousemove", move)
        FOCUSED_IMAGE.addEventListener("mouseout", stopZoom)
        ZOOMED_IMAGE.src = event.target.src
        ZOOMED_IMAGE_DIV.style.display = "block"
    }
    function move(event) {
        //Musens position i forhold til hele viduet
        let mouseX = event.clientX
        let mouseY = event.clientY
        //getBound.. returerer propperties om selve elementets position 
        let rect = event.target.getBoundingClientRect()
        //Med lidt matematik kan vi nu få musens position relativ til billedet
        posX = mouseX - rect.left
        posY = mouseY - rect.top
        ZOOMED_IMAGE.style.transformOrigin = `${posX}px ${posY}px`
    }
    function stopZoom() {
        ZOOMED_IMAGE_DIV.style.display = "none"
        //Oprydning og rengøring
        //  FOCUSED_IMAGE.removeEventListener("mousemove")
        //  FOCUSED_IMAGE.removeEventListener("mouseout")
    }



    function init(images = []) {
        FOCUSED_IMAGE.src = images[0]
        images.forEach(buildThumbnail) //putter thumbnails ind i div
        GALLERY.append(FOCUSED_IMAGE, THUMBNAILS, ZOOMED_IMAGE_DIV)
    }

    return {
        init
    }

})()