let color = 'Blue'
artlist = []
let size = 'M'
let result = 0
let imgsrc = 0

function Update(arg){    
    artlist = []
    for (i of document.getElementsByClassName("review")){
        artlist.push(i)
    }
    for (i of artlist){
        i.remove();
    }
    if (arg=="Blue" || arg=="Yellow") {
        color = arg
    }else{
        size = arg
    }     


    let rates = []
    let total = 0
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://my-json-server.typicode.com/Lugus-Shopify/hiring/product", true)
    xhttp.responseType="json"
    xhttp.send();
    xhttp.onreadystatechange=function(){
        if (this.readyState == 4 && this.status==200){
            result = this.response
            for (var i in result.variants){
                i = result.variants[i]
                if (i.color == color){
                    if (i.size == size){
                        imgsrc = i.image
                        document.getElementById("preview").src = imgsrc
                        document.getElementById("productName").innerHTML = result.title
                        document.getElementById("price").innerHTML = result.price + "€"
                        document.getElementById("desc").innerHTML = result.description
                        for (i in result.reviews){
                            let review = document.createElement("article");
                            review.className = "review"
                            let reviewtop = document.createElement("div")
                            let reviewdesc = document.createElement("p")
                            reviewdesc.innerHTML = result.reviews[i].comment
                            reviewtop.appendChild(reviewdesc)
                            let rating = document.createElement("span")
                            rating.innerHTML = result.reviews[i].rate.toString() + "/5"
                            rates.push(result.reviews[i].rate)
                            reviewtop.appendChild(rating)
                            review.appendChild(reviewtop)
                            let nest = document.getElementById("reviewlist")
                            nest.appendChild(review)}
                        for (i in rates){
                            total += rates[i]                                
                        }                                
                        average = total / rates.length
                        average = average.toFixed(1)
                        rateAVE = document.getElementById("average")
                        rateAVE.innerHTML = average.toString() + "/5 (" + rates.length.toString() + " avis)"
                        
                    } 
                }
            } 
        }
    }
    
}
function additem(){
    document.getElementsByTagName("input").value += 1
}
function retractitem(){
    document.getElementsByTagName("input").value -= 1
}