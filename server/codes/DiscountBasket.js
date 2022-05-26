let products = [
	{
		"productId": 34578,
		"productName": "DyneVakoom 1",
		"amount": 1,
		"price": 299.9
	},
	{
		"productId": 288,
		"productName": "Dyne Cola 0.5l",
		"amount": 3,
		"price": 1.75,
		"campaign": true
	}
];

function calculatePrice(basket){
	let price = 0;
	let amount = 0;

	for(let i = 0; i < basket.length; i++){
		if(basket[i].campaign && basket[i].amount >= 3) {
			amount = Math.ceil(basket[i].amount/3*2)
			price += (amount*basket[i].price)
		} else{
			price += (basket[i].amount*basket[i].price)
		}
		};
		if(price < 100){
			price += 15
		}

	return price;
}

console.log(calculatePrice(products));
