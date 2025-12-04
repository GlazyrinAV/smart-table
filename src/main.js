import './fonts/ys-display/fonts.css'
import './style.css'

import {data as sourceData} from "./data/dataset_1.js";

import {initData} from "./data.js";
import {processFormData} from "./lib/utils.js";
import {initPagination} from "./components/pagination.js";
import {initSorting} from "./components/sorting.js";
import {initFiltering} from "./components/filtering.js";
import {initSearching} from "./components/searching.js";
import {initTable} from "./components/table.js";

// Исходные данные используемые в render()
const {data, ...indexes} = initData(sourceData);

/**
 * Сбор и обработка полей из таблицы
 * @returns {Object}
 */
function collectState() {
    const state = processFormData(new FormData(sampleTable.container));
    const rowsPerPage = parseInt(state.rowsPerPage);
    const page = parseInt(state.page ?? 1);
    let total = [];

    if (state['totalFrom']) {
        total.push(parseInt(state['totalFrom']));
    } else {
        total.push(undefined);
    }
    if (state['totalTo']) {
        total.push(parseInt(state['totalTo']));
    } else {
        total.push(undefined);
    }

    if (total[0] === undefined && total[1] === undefined) {
        total = undefined;
    }

    return {
        ...state,
        rowsPerPage,
        page,
        total
    };
}

/**
 * Перерисовка состояния таблицы при любых изменениях
 * @param {HTMLButtonElement?} action
 */
function render(action) {
    let state = collectState(); // состояние полей из таблицы
    let result = [...data]; // копируем для последующего изменения
    // result = applySearch(result, state, action);
    // result = applyFiltering(result, state, action);
    console.log(result)
    // result = applySorting(result, state, action);
    console.log(result)
    // result = applyPagination(result, state, action);
    console.log(result)

    sampleTable.render(result)
}

const sampleTable = initTable({
    tableTemplate: 'table',
    rowTemplate: 'row',
    before: ['search', 'header', 'filter'],
    after: ['pagination']
}, render);

const applyPagination = initPagination(
    sampleTable.pagination.elements, (el, page, isCurrent) => {
        const input = el.querySelector('input');
        const label = el.querySelector('span');
        input.value = page;
        input.checked = isCurrent;
        label.textContent = page;
        return el;
    }
);

const applySearch = initSearching(
    sampleTable.search.elements.searchField.querySelector('.input').dataset.name
);

const applySorting = initSorting([
    sampleTable.header.elements.sortByDate,
    sampleTable.header.elements.sortByTotal
]);

// const applyFiltering = initFiltering(sampleTable.filter.elements, {
//     searchBySeller: indexes.sellers
// });

const appRoot = document.querySelector('#app');
appRoot.appendChild(sampleTable.container);

render();
