import React from 'react';
import { CategoryFulllnfos } from './CategoryFulllnfos';
import CategoryCard from './CategoryCard';
import classes from './Category.module.css';

function Category() {
  return (
    <section className={classes.Category_container}>
      {CategoryFulllnfos.map((info, index) => (
        <CategoryCard key={index} data={info} />
      ))}
    </section>
  );
}

export default Category;

