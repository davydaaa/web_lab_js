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

const toggleCreateFormButton = document.getElementById("toggle_create_form_button");
const createForm = document.getElementById("create_form");


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



const itemTemplate = (item) => `
  <div class="card_body">
    <span>Brand:</span><input class="brand_input" value="${item.brand}" disabled>
    <span>Color:</span><input class="color_input" value="${item.color}" disabled>
    <span>Matherial:</span><input class="matherial_input" value="${item.matherial}" disabled>
    <span>Pencils:</span><input class="num_pencils_input" value="${item.num_pencils}" disabled>
    <span>Pens:</span><input class="num_pens_input" value="${item.num_pens}" disabled>
    <span>Erasers:</span><input class="num_erasers_input" value="${item.num_erasers}" disabled>
    <button class="edit_button">Edit</button>
    <button class="cancel_button" style="display: none;">Cancel</button>
  </div>
`;

const addItemToPage = (item) => {
  const itemElement = document.createElement('div');
  itemElement.innerHTML = itemTemplate(item);
  
  const editButton = itemElement.querySelector('.edit_button');
  const cancelButton = itemElement.querySelector('.cancel_button');
  const inputs = itemElement.querySelectorAll('input');
  
  editButton.addEventListener('click', () => {
    // Перевірка на валідність чисел при редагуванні
    const newNumPencils = parseFloat(inputs[3].value);
    const newNumPens = parseFloat(inputs[4].value);
    const newNumErasers = parseFloat(inputs[5].value);
  
    if (isNaN(newNumPencils) || isNaN(newNumPens) || isNaN(newNumErasers) || newNumPencils < 0 || newNumPens < 0 || newNumErasers < 0) {
      alert("Введіть невід'ємні числа для кількості олівців, ручок та резинок.");
      return;
    }
  
    inputs.forEach((input, index) => {
      input.disabled = !input.disabled;
      cancelButton.style.display = cancelButton.style.display === 'none' ? 'block' : 'none';
  
      if (!inputs[0].disabled) {
        item.brand = inputs[0].value;
        item.color = inputs[1].value;
        item.matherial = inputs[2].value;
        item.num_pencils = newNumPencils;
        item.num_pens = newNumPens;
        item.num_erasers = newNumErasers;
      }
    });
  });
  

  cancelButton.addEventListener('click', () => {
      if (!inputs[0].disabled) {
          inputs[0].value = item.brand;
          inputs[1].value = item.color;
          inputs[2].value = item.matherial;
          inputs[3].value = item.num_pencils;
          inputs[4].value = item.num_pens;
          inputs[5].value = item.num_erasers;

          inputs.forEach(input => input.disabled = true);
      }
      cancelButton.style.display = 'none';
  });

  Card.insertAdjacentElement("afterbegin", itemElement);
};



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


CreateButton.addEventListener("click", (event) => {
    event.preventDefault();
  
    const { brand, color, matherial, num_pencils, num_pens, num_erasers } = getInputValues();
  
    if (isNaN(num_pencils) || isNaN(num_pens) || isNaN(num_erasers) || num_pencils < 0 || num_pens < 0 || num_erasers < 0) {
      alert("Введіть невід'ємні числа для кількості олівців, ручок та резинок.");
      return;
    }
  
    clearInputs();
  
    addItem({ brand, color, matherial, num_pencils, num_pens, num_erasers });
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
    let itemsToSort = searchResults.length > 0 ? searchResults : schoolpens;
    itemsToSort = itemsToSort.slice(); // Create a copy to avoid modifying the original array
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

toggleCreateFormButton.addEventListener("click", () => {
  if (createForm.style.display === "none") {
      createForm.style.display = "block";
  } else {
      createForm.style.display = "none";
  }
});