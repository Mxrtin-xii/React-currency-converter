
import React from "react";
import axios from "axios";
import converter from "../src/Components/converter.css";


class Converter extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				result: null,
				fromCurrency: "USD",
				toCurrency: "EUR",
				amount: 1,
				currency: []
				};
			}
			
	componentDidmount() {
		axios
			.get("http://api.openrates.io/latest")
			.then (response => {
				const currencyAr =  ["EUR"]
				for (const key in response.data.rates){
					currencyAr.push.(key);
				 }
			this.setstate({currency: currencyAr });
			})		
			.catch(err => {
				console.log("ooops", err);
			});
		}
			
	converthandler = () => {
	if (this.state.fromcurrency  !== this.state.tocurrency) {
		axios
			.get(
				'http://api.openrates.io/latest?base=${this.state.fromCurrency}&symbol=${this.state.tocurrency}'
			)
			.then(response => {
				const result = this.state.amount * response.data.rates[this.state.tocurrency];
					this.setstate({result: result.toFixed(5) });
					})
			.catch(error => {
				console.log("ooops", error.message);
				});
			} else {
				this.setstate({ result: "You can not convert the same currency!" });
			}
		};
		
	selecthandler = event => {
		if (event.target.name === "from") {
				this.setstate({ fromCurrency: event.target.value});
			} else {
			if (event.target.name === "to") {
				this.setstate ({ tocurrency: event.target.value});
				}
			}
		};
		
	render() {
		return (
			<div classname="converter">
			<h2>
				<span>Currency</span>converter <span role="img" arial-label="money">&#x1f4b5;</span>
			</h2>
			<div classname="from">
			<input 
				name="amount" 
				type="text" 
				value={this.state.amount}
				onchange = {event => this.setstate({amount: event.target.value })\}
			/>
			<select
				name="from"
				value={this.state.fromcurrency}
				onchange= {event => this.selecthandler (event) }
			>
			 {this.state.currency.map(cur => (
				<option key={cur}>{cur}</option>
				))}
			</select>
			
			<select 
				name="to"
				value={this.state.toCurrency}
				onchange= {event => this.selecthandler(event) }
			>
			{this.state.currency.map(cur =>  (
				<option key={cur}>{cur}</option>
			))}
			</select>
			<button onclick={this.converthandler}>convert</button>
			{this.state.result && <h3>{this.state.result}</h3>}
		    </div>
		 </div>
	   );
	}
}
		
export default Converter;					