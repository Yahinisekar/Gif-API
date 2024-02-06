let apiKey = "mbbXZNDoJnGLpAy8ROyTzDxS9D34S5H8";
let submitButton = document.getElementById("btn");

let generateGif = () => {
    //display loader untill gif load
    let loader = document.querySelector(".loader");
    loader.style.display = "block";
    document.querySelector(".wrapper").style.display = "none";

    //get search value default=laugh
    let q = document.getElementById("search").value;
    //we need 10 gifs to display
    let gifCount = 12;
    let Url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
    document.querySelector(".wrapper").innerHTML = "";
    fetch(Url).then((res) => res.json()).then((info) => {
        console.log(info.data);
        let gifsData = info.data;
        gifsData.forEach((gif) => {
            //generate cards for every gif
            let container1 = document.createElement("div")
            container1.classList.add("container1");
            let iframe = document.createElement("img");
            console.log(gif);
            iframe.setAttribute('src', gif.images.downsized_medium.url);
            iframe.onload = () => {
                gifCount--;
                if (gifCount === 0) {
                    loader.style.display = "none"
                    document.querySelector(".wrapper").style.display="grid"
                 }
                
            }

            container1.append(iframe);

            //copy button
            let copyBtn = document.createElement("button");
            copyBtn.innerText = "Copy Link";
            copyBtn.onclick = () => {
                let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`
                navigator.clipboard
                  .writeText(copyLink)
                  .then(() => {
                    alert("GIF copied to clipboard");
                  })
                  .catch(() => {
                    alert("GIF copied to clipboard");

                    let hiddenInput = document.createElement("input");
                    hiddenInput.setAttribute("type", "text");
                    document.body, appendChild(hiddenInput);
                    hiddenInput.value = copyLink;
                    //select input
                    hiddenInput.select();
                    //copy the value
                    document.execCommand("copy");
                    //remove the input
                    document.body.removeChild(hiddenInput);
                  });
            }
            container1.append(copyBtn);
            document.querySelector(".wrapper").append(container1);
            
        });

    });
}
submitButton.addEventListener("click", generateGif);
window.addEventListener("load",generateGif)