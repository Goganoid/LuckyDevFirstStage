import React from 'react';
import Button from 'react-bootstrap/Button';
import Select, { type MultiValue } from 'react-select';
import { type Meal } from 'src/api/mealdb.service';
import { MealsLoader, type MealsFilter } from 'src/api/meals_loader.service';
import { UserApi } from 'src/api/user.service';
import { areaOptions, categoryOptions, convertToFilterList, ingredientOptions, type FilterItem } from 'src/config/constants';
import { isLoggedIn } from 'src/utils/storage';
import styled from 'styled-components';
import { itemsPerLoad } from '../config/constants';
import axios from 'axios';

export const FilterMenu = styled.div`
    float: right;
    top: 85px;
    bottom: 18%;
    position: sticky;
    display: flex;
    width: 90%;
    max-width: 350px;
    background-color: #D6D6D6 !important;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 30px;
`;


export type FilterProps = {
    setSearchFilters: React.Dispatch<React.SetStateAction<MealsFilter>>,
    searchFilters: MealsFilter,
    setMeals: React.Dispatch<React.SetStateAction<Meal[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

export function Filter({ setSearchFilters, searchFilters, setMeals, setLoading }: FilterProps) {
    return (
    <FilterMenu>
        <form className='search-form'>
            <input type="image"
                name="search"
                src='free-icon-magnifying-glass-126474.png'
                alt='x'
                onClick={() => {
                    console.log(searchFilters);
                    setLoading(true);
                    MealsLoader.Reset();
                    MealsLoader.TakeNext(itemsPerLoad, searchFilters).then(result => {
                        setMeals(result);
                        setLoading(false);
                    });
                }}>
            </input>
            <input name="search-line"
                placeholder="search"
                value={searchFilters.name} onChange={(event) => {
                    setSearchFilters({
                        ...searchFilters,
                        name: event.target.value
                    })
                }}></input>

            <h5>Category:</h5>
            <Select
                className='filter-item'
                options={convertToFilterList(categoryOptions)}
                isClearable={true}
                isSearchable={true}
                onChange={(newValue, { action }) => {
                    if (action === 'select-option')
                        setSearchFilters({
                            ...searchFilters,
                            category: newValue!.value
                        });
                    if (action === 'deselect-option' || action === 'clear')
                        setSearchFilters({
                            ...searchFilters,
                            category: ''
                        });
                }} />

            <h5>Area:</h5>
            <Select
                className='filter-item'
                options={convertToFilterList(areaOptions)}
                isClearable={true}
                isSearchable={true}
                onChange={(newValue, { action }) => {
                    if (action === 'select-option')
                        setSearchFilters({
                            ...searchFilters,
                            area: newValue!.value
                        });
                    if (action === 'deselect-option' || action === 'clear')
                        setSearchFilters({
                            ...searchFilters,
                            area: ''
                        });
                }} />

            <h5>Ingredients:</h5>
            <Select
                className='filter-item'
                value={searchFilters.ingredients.length !== 0 ? convertToFilterList(searchFilters.ingredients) : null}
                options={convertToFilterList(ingredientOptions)}
                isMulti
                isClearable={true}
                isSearchable={true}
                onChange={(newValue: MultiValue<FilterItem>, { action }) => {
                    console.log(newValue, action);
                    if (action === 'select-option' || action === 'remove-value')
                        setSearchFilters({
                            ...searchFilters,
                            ingredients: [...newValue.map(v => v.value)]
                        });
                    if (action === 'clear') {
                        setSearchFilters({
                            ...searchFilters,
                            ingredients: []
                        });
                    }
                }} />

            <Button className='Bootstrap-Button d-flex mt-4 mx-auto w-90%' onClick={() => {
                console.log(searchFilters);
                setLoading(true);
                MealsLoader.Reset();
                MealsLoader.TakeNext(itemsPerLoad, searchFilters).then(result => {
                    setMeals(result);
                    setLoading(false);
                });
            }}>Apply</Button>
             {isLoggedIn() && <Button className='Bootstrap-Button d-flex mt-4 mx-auto'
                onClick={() => {
                    UserApi.GetUserIngredients().then(result => {
                        console.log(result);
                        const ingredients = result.data.map(i => i.name);
                        setSearchFilters({ ...searchFilters, ingredients:ingredients });
                    })
                }}
            ><span className='w-90%'>What can I cook with my products...</span></Button>}
        </form>
    </FilterMenu>
    )
}
