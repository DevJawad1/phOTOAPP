let chooseImgBtn = document.querySelector(".choose_img button")
let chooseInput = document.querySelector(".choose_img input")
let imgSrc = document.querySelector(".view_img img")
let filterButtons = document.querySelectorAll(".icon_rooms button")
let slider = document.querySelector(".slider input")
let filterName = document.querySelector(".filter_info .name")
let sliderValue = document.querySelector(".filter_info .value")
let rotateBtns = document.querySelectorAll(".icon_rooms1 button")
let reset = document.querySelector(".reset")
let save = document.querySelector(".save")
let brightness = 100, contrast = 100, saturate = 100, invert = 0, blur = 0, rotate = 0, flip_x = 1, flip_y = 1, sharpen=0;

chooseImgBtn.addEventListener('click', () => chooseInput.click())
chooseInput.addEventListener('change', () => {
    let file = chooseInput.files[0]
    if (!file) return;
    imgSrc.src = URL.createObjectURL(file)
    imgSrc.addEventListener('load', () => {
        document.querySelector('.container').classList.remove("disabled")
    });
});

filterButtons.forEach((element) => {
    element.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        element.classList.add("active")
        filterName.innerText = element.id
        if (element.id === "brightness") {
            slider.max = "200"
            slider.value = brightness
            sliderValue.innerText = `${brightness}`
        }
        else if (element.id === "contrast") {
            slider.max = "200"
            slider.value = contrast
            sliderValue.innerText = `${contrast}`
        }
        else if (element.id === "saturate") {
            slider.max = "200"
            slider.value = saturate
            sliderValue.innerText = `${saturate}`
        }
        else if (element.id === "invert") {
            slider.max = "100"
            slider.value = invert
            sliderValue.innerText = `${invert}`
        }
        else if (element.id === "blur") {
            slider.max = "100"
            slider.value = blur
            sliderValue.innerText = `${blur}`
        }
    });
});

slider.addEventListener("input", () => {
    sliderValue.innerText = `${slider.value}%`
    let sliderState = document.querySelector(".icon_rooms .active")
    if (sliderState.id === "brightness") {
        brightness = slider.value
    } else if (sliderState.id === "contrast") {
        contrast = slider.value
    } else if (sliderState.id === "saturate") {
        saturate = slider.value
    } else if (sliderState.id === "invert") {
        invert = slider.value
    }
    else if (sliderState.id === "blur") {
        blur = slider.value
    }
    imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`
})

rotateBtns.forEach((element) => {
    element.addEventListener('click', () => {
        if (element.id === "rotate_left") {
            rotate -= 90
        }
        else if (element.id === "rotate_right") {
            rotate += 90
        }
        else if (element.id === "flip_x") {
            flip_x = flip_x === 1 ? -1 : 1
        }
        else if (element.id === "flip_y") {
            flip_y = flip_y === 1 ? -1 : 1
        }
        imgSrc.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y}) `
    })
})

reset.addEventListener('click', () => {
    brightness = "100"
    saturate = "100"
    contrast = "100"
    invert = "0"
    blur = "0"
    rotate = 0
    flip_x = 1
    flip_y = 1

    imgSrc.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y}) `
    imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`
})

save.addEventListener('click', () => {
    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext("2d")
    // console.log(imgSrc.naturalWidth);
    // console.log(imgSrc.naturalHeight);
    canvas.width = imgSrc.naturalWidth
    canvas.height = imgSrc.naturalHeight

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`
    ctx.scale(flip_x, flip_y)
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.drawImage(
        imgSrc,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
    )
    const link=document.createElement('a')
    link.download = "img.jpg"
    link.href = canvas.toDataURL()
    link.click()
})