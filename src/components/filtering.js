import {createComparison, defaultRules} from "../lib/compare.js";

const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    Object.keys(indexes)
        .forEach((elementName) => {
            elements[elementName].append(
                ...Object.values(indexes[elementName])
                    .map(name => {
                        const newOption = document.createElement('option');
                        newOption.textContent = name;
                        return newOption;
                    })
            )
        })

    return (data, state, action) => {
        if (action && action.name === 'clear') {
            action.parentNode.querySelector('.input').value = '';
            state[action.dataset.field] = '';
        }

        return data.filter(row => compare(row, state));
    }
}