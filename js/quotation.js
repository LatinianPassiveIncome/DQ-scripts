
/**
 * // Needed to wrap the full script into the 'geoip' function
 * which is the callback of the JSONP being used by location API: https://get.geojs.io/v1/ip/geo.js
 * @param {*} json
 */
function geoip(json){
  const cc = json.country_code;

  // Shapes
  let currentShape = 'Rectangular';
  const shapes = [currentShape, 'Hexagonal'];
  const selectedShapeEl = document.getElementById('selected-shape');
  const optionShapeEl = document.getElementById('option-shape');

  optionShapeEl.addEventListener('click', function() {
    currentShape = optionShapeEl.textContent;
    const currentSelection = selectedShapeEl.textContent;
    document.getElementById('option-shape').textContent = currentSelection;
    document.getElementById("selected-shape").textContent = currentShape;
    updateViews();
    updatePrices()
  });

  // Sizing: Custom or standard
  let currentSizingType = 'Standard sizes';
  const standardSizingOptions = [currentSizingType, 'Tamaños estándard'];
  // const customSizingOptions = ['Custom sizes', 'Tamaños a medida'];
  const selectedSizingTypeEl = document.getElementById('selected-sizing');
  const optionSizingTypeEl = document.getElementById('option-sizing');

  optionSizingTypeEl.addEventListener("click", function updateSelectedSizingType() {
    currentSizingType = optionSizingTypeEl.textContent;
    const currentSelection = selectedSizingTypeEl.textContent;
    document.getElementById("option-sizing").textContent = currentSelection;
    document.getElementById("selected-sizing").textContent = currentSizingType;
    updateViews();
    updatePrices();
  });


  // Sizes
  for (const shape of shapes) {
    const sizeOptionsElements = document.getElementById(`${shape.toLowerCase()}-size-options`).children;
    const selectedSizeEl = document.getElementById(`selected-${shape.toLowerCase()}-size`);
    for (const el of sizeOptionsElements) {
      el.addEventListener('click', function updateSelectedSize() {
        const option = el.firstChild.textContent;
        selectedSizeEl.textContent = option;
        updatePrices();
      })
    }
  }

  // Size inputs
  const inputs = document.querySelectorAll('input');
  let width = 0;
  let height = 0;
  let diameter = 0;
  for (const input of inputs) {
    input.addEventListener('input', function updateEntry(event) {
      switch (input.id) {
        case 'width':
          width = event.target.value;
          break;
        case 'height':
          height = event.target.value;
          break;
        case 'diameter':
          diameter = event.target.value;
          break;
        default:
          break;
      }
      updatePrices();
    })
  }

  function updateViews() {
    if (currentShape === 'Rectangular') {
      document.getElementById('standard-hexagonal').classList.add('hide');
      document.getElementById('custom-hexagonal').classList.add('hide');

      if (standardSizingOptions.includes(currentSizingType)) {
        document.getElementById('standard-rectangular').classList.remove('hide');
        document.getElementById('custom-rectangular').classList.add('hide');
      } else {
        // Custom Rectangular
        document.getElementById('custom-rectangular').classList.remove('hide');
        document.getElementById('standard-rectangular').classList.add('hide');
      }
    } else {
      // Hexagonal
      document.getElementById('standard-rectangular').classList.add('hide');
      document.getElementById('custom-rectangular').classList.add('hide');
      if (standardSizingOptions.includes(currentSizingType)) {
        document.getElementById('standard-hexagonal').classList.remove('hide');
        document.getElementById('custom-hexagonal').classList.add('hide');
      } else {
        // Custom Hexagonal
        document.getElementById('custom-hexagonal').classList.remove('hide');
        document.getElementById('standard-hexagonal').classList.add('hide');
      }

    }
  }

  function updatePrices() {
    const shape = document.getElementById("selected-shape").textContent;
    const rug = document.getElementById('page-title').textContent;

    let dim;
    if (standardSizingOptions.includes(currentSizingType)) {
      dim = document.getElementById(`selected-${shape.toLowerCase()}-size`).textContent;
    } else {
      if (shape === 'Rectangular') {
        dim = `${width} ⨉ ${height}`;
      } else {
        dim = `${diameter}`;
      }
    }

    let currency = 'USD';
    if (cc === 'MX') {
      currency = 'MXN';
    }
    const exchange = {
      USD: 0.074, // To MXN;
    };
    const prices = calculateEnsamblados(rug, shape, dim, currency, exchange);

    const options = {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol", // remove the country MX from the currency sign
    };
    if (prices.grey === undefined) {
      document.getElementById('grey-results-block').classList.add('hide');
      document.getElementById('title-color').classList.add('hide');
    } else {
      document.getElementById('grey-results-block').classList.remove('hide');
      document.getElementById('title-color').classList.remove('hide');
    }

    document.getElementById("price-natural").textContent = new Intl.NumberFormat('en-US', options).format(prices.grey);
    document.getElementById("price-color").textContent = new Intl.NumberFormat("en-US", options).format(prices.color);
  }

  function calculateEnsamblados(rug, shape, dim, currency, exchange, units = 188) {
    rug = rug.toLowerCase();
    const corales = ['coral', 'milpa alta'];
    const colmenaMixta = ['constelación', 'lineas', 'ojo de dios']

    const classification = {
      classA: {
        base: 'coral',
        prima: currency === 'MXN' ? 13.88 : 13.88 * exchange.USD,
        margen: 2.2,
        canBeGrey: true, // children cannot
        children: [
          {
            rugs: ['coral'],
            premium: 0,
            description: 'basis',
          },
          {
            rugs: ['milpa alta'],
            premium: 0.35, // 35%
            description: 'coral gris + 35%',
          },
        ],
      },
      classB: {
        base: 'colmena',
        prima: currency === 'MXN' ? 6.246 : 6.246 * exchange.USD,
        margen: 4,
        canBeGrey: true, // children cannot
        children: [
          {
            rugs: ['colmena'],
            premium: 0, // no premium
            description: 'basis',
          },
          {
            rugs: colmenaMixta,
            premium: 0, // no premium
            description: '(colmena gris)/2 + (colmena color)/2',
          },
          {
            rugs: ['nebulosa', 'gradación'],
            premium: 0.15, // 15%
            description: 'colmena gris + 15%',
          },
        ],
      },
    };

    let m2;
    if (shape === 'Rectangular') {
      const [width, height] = dim.split('⨉');
      m2 = (parseInt(width) * parseInt(height)) / 10 ** 4;
      m2 = isNaN(m2) ? 0 : m2;
    } else {
      const r = parseInt(dim) / 10 ** 2 / 2;
      m2 = isNaN(r) ? 0 : Math.PI * r ** 2;
    }
    let type = corales.includes(rug) ? classification.classA : classification.classB;
    const margen = type.margen;
    const materiaPrima = type.prima;
    const premium = 1 + type.children.filter((child) => child.rugs.includes(rug))[0].premium;
    const penalty = m2 < 4 ? 1.15 : 1;

    const prices = {};
    const grey = m2 * units * materiaPrima * margen * penalty * premium;
    const color = grey * 1.25;
    if (colmenaMixta.includes(rug)){
      prices.color = (grey / 2) + (color / 2);
    } else {
      prices.color = color;
    }
    prices.grey = type.base === rug ? grey : undefined;
    return prices;
  }
}
