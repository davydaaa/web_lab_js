const CreateButton = document.getElementById("create_button");
const SearchButton = document.getElementById("search_button");
const CancelSearchButton = document.getElementById("cancel_search_button");
const SearchInput = document.getElementById("search_input");
const SortButton = document.getElementById("sort_button");
const CountButton = document.getElementById("count_button");

const BrandInput = document.getElementById("brand_input");
const ColorInput = document.getElementById("color_input");
const MatherialInput = document.getElementById("matherial_input");
const NumPencilsInput = document.getElementById("num_pencils_input");
const NumPensInput = document.getElementById("num_pens_input");
const NumErasersInput = document.getElementById("num_erasers_input");
const Card = document.getElementById("card");


const getInputValues = () => {
  return {
    brand: BrandInput.value,
    color: ColorInput.value,
    matherial: MatherialInput.value,
    num_pencils: NumPencilsInput.value,
    num_pens: NumPensInput.value,
    num_erasers: NumErasersInput.value,
  };
};

const clearInputs = () => {
    BrandInput.value = "";
  
    ColorInput.value = "";
      
    MatherialInput.value = "";
      
    NumPencilsInput.value = "";
      
    NumPensInput.value = "";
      
    NumErasersInput.value = "";
};

const renderItemsList = (items, onEditItem, onRemoveItem) => {
    Card.innerHTML = "";
    
    for (const item of items) {
      addItemToPage(item, onEditItem, onRemoveItem);
    }
};



const addItemToPage = ({brand, color, matherial, num_pencils, num_pens, num_erasers}) => {
    Card.insertAdjacentHTML(
      "afterbegin",
      itemTemplate({brand, color, matherial, num_pencils, num_pens, num_erasers})
    );
  
};

const itemTemplate = ({ brand, color, matherial, num_pencils, num_pens, num_erasers }) => `

  <div class="card_body">
    <h5 class="card-title">Brand:${brand}</h5>
    <p class="card-text">Color:${color}</p>
    <p class="card-text">Matherial:${matherial}</p>
    <p class="card-text">number of pencils:${num_pencils}</p>
    <p class="card-text">number of pens:${num_pens}</p>
    <p class="card-text">number of erasers:${num_erasers}</p>
  </div>
`;


let schoolpens = [];


const addItem = ({brand, color, matherial, num_pencils, num_pens, num_erasers}) => {
    const newItem = {
        brand,
        color,
        matherial,
        num_pencils,
        num_pens,
        num_erasers,
    }

    schoolpens.push(newItem);

    addItemToPage(newItem);
};


CreateButton.addEventListener ("click",(event) => {
    event.preventDefault();

    const {brand, color, matherial, num_pencils, num_pens, num_erasers} = getInputValues();

    clearInputs();

    addItem( {brand, color, matherial, num_pencils, num_pens, num_erasers})
});

let searchResults = [];


SearchButton.addEventListener("click", () => {
  searchResults = schoolpens.filter(
    (schoolpen) => schoolpen.brand.toLowerCase().search(SearchInput.value.toLowerCase()) !== -1
  );

  renderItemsList(searchResults);
});
  
CancelSearchButton.addEventListener("click", () => {
  searchResults = [];
  renderItemsList(schoolpens);

  SearchInput.value = ""
});

SortButton.addEventListener("click", () => {
  const itemsToSort = searchResults.length > 0 ? searchResults : schoolpens;
  itemsToSort.sort((a, b) => a.num_pencils - b.num_pencils);
  renderItemsList(itemsToSort);
});

CountButton.addEventListener("click", () => {
  const itemsToCount = searchResults.length > 0 ? searchResults : schoolpens;
  let totalPencils = 0;
  let totalPens = 0;
  let totalErasers = 0;

  for (const item of itemsToCount) {
      totalPencils += Number(item.num_pencils);
      totalPens += Number(item.num_pens);
      totalErasers += Number(item.num_erasers);
  }

  alert(`Загальна кількість олівців: ${totalPencils}, ручок: ${totalPens}, резинок: ${totalErasers}`);
});