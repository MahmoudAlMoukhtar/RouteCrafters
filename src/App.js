
import { useState } from 'react';
import './App.css';
import TruckForm from './components/TruckForm';
import GoodsForm from './components/GoodsForm';
import AddressForm from './components/AddressForm';
import ResultDisplay from './components/ResultDisplay';


class Graph {
  constructor() {
      this.nodes = new Set();
      this.edges = {};
  }

  addNode(node) {
      this.nodes.add(node);
      this.edges[node] = [];
  }

  addEdge(fromNode, toNode, weight) {
      this.edges[fromNode].push({ to: toNode, weight });
      this.edges[toNode].push({ to: fromNode, weight });
  }
}

class GeneticAlgorithm {
  constructor(graph, populationSize, generations) {
      this.graph = graph; // Your graph with addresses and travel times
      this.populationSize = populationSize;
      this.generations = generations;
  }

  getRandomRoute() {
      // Create a random permutation of addresses
      const addresses = Array.from(this.graph.nodes);
      for (let i = addresses.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [addresses[i], addresses[j]] = [addresses[j], addresses[i]];
      }
      return addresses;
  }

  evaluateFitness(route) {
      // Calculate the total distance for the given route
      let totalDistance = 0;
      for (let i = 0; i < route.length - 1; i++) {
          const fromNode = route[i];
          const toNode = route[i + 1];
          totalDistance += this.graph.distances[`${fromNode}-${toNode}`];
      }
      return totalDistance;
  }

  initializePopulation() {
      const population = [];
      for (let i = 0; i < this.populationSize; i++) {
          const route = this.getRandomRoute();
          const fitness = this.evaluateFitness(route);
          population.push({ route, fitness });
      }
      return population;
  }
}



function App() {
  const [truckCapacity, setTruckCapacity] = useState(null);
  const [goodsList, setGoodsList] = useState([]);
  const [addressesList, setAddressesList] = useState([]);
  const [maxValue, setMaxValue] = useState(0);

  //algorithms
    //knapsack algorithm
      function knapsack(items, capacity) {
        const n = items.length;
        const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
        for (let i = 1; i <= n; i++) {
            const { weight, value } = items[i - 1];
            for (let w = 1; w <= capacity; w++) {
                if (weight <= w) {
                    dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + value);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }

        return dp[n][capacity];
      }


  //forms submit functions
  const handleAddressSubmit = (addressData) => {
    setAddressesList([...addressesList, addressData]);
    // Example usage:
      const g = new Graph(); // Initialize your graph with addresses and travel times
      // Add nodes and edges (addresses and travel times) to the graph

      const ga = new GeneticAlgorithm(g, 100, 1000); // Population size and generations
      const bestRoute = ga.initializePopulation();

      console.log('bestRoute:', bestRoute);
  };

  const handleCapacitySubmit = (capacity) => {
    setTruckCapacity(capacity);
    // You can pass this goods list to other components or algorithms
    const maxValue = knapsack(goodsList, truckCapacity);
    setMaxValue(maxValue);
    // You can pass this capacity to other components or algorithms
  };

  const handleGoodsSubmit = (goodsData) => {
    setGoodsList([...goodsList, goodsData]);    
  };
  return (
    <div className="App">
      <div className='container'>

      
        <div className='pre_header'></div>
      <header className='App-header'>
        <img className='logo' src='/images/Logo_RouteCrafters.png'/>
      </header>
      <section className='main_text_section'>
        <h2 className='title'>
          Navigating Efficiency for a Sustainable Tomorrow
        </h2>
        <p className='description'>
          RouteCrafters empowers communities with optimal, eco-friendly routes, connecting neighborhoods, businesses, and green spaces. Our mission? To enhance urban mobility while preserving our natural heritage.
        </p>
      </section>
      <img className='main_img_truck' src='/images/main_img_truck.png' alt=''/>
      {/* Other forms/components */}
      <section className='display_resulte_section'>
        <section className='goods_list'>
          <h3>Goods List</h3>
          <div className='container_items'>
              {
                goodsList.map((good)=>(
                  <div className='props_list'>
                    (
                      <span className='prop_item'>Name: {good.name}</span>
                      <span className='prop_item'>Weight: {good.weight}</span>
                      <span className='prop_item'>Value: {good.value}</span>
                    )
                  </div>
                ))
              }
          </div>
        </section>
        <section className='addresses_list'>
        <h3>Addresses List</h3>
          <div className='container_items'>
              {
                addressesList.map((address)=>(
                  <li className='props_list'>
                    <span className='prop_item'>Name: {address.name}</span>
                    <span className='prop_item'>Latitude: {address.latitude}</span>
                    <span className='prop_item'>Longitude: {address.longitude}</span>
                  </li>
                ))
              }
          </div>
        </section>
      </section>


      <section className='forms_section'>      
      <TruckForm onCapacitySubmit={handleCapacitySubmit} />
      <GoodsForm onGoodsSubmit={handleGoodsSubmit} />
      <AddressForm onAddressSubmit={handleAddressSubmit} />      
      </section>
      <section className='forms_section'>
      <div className='route_item'>
        <img width={300} src='/images/route.png' />
      </div>
      <ResultDisplay
          goodsLoaded={goodsList}
          maxValue={maxValue}
          shortestRoute={[]}
          />
      </section>
      {/* Display results */}
      <footer></footer>
      </div>
    </div>
  );
}

export default App;
