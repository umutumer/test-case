import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import { Product } from "../../types/types";

interface Props {
  products: Product[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
}

const CategoryFilterSidebar: React.FC<Props> = ({
  products,
  selectedCategories,
  onCategoryChange,
  onClearFilters,
}) => {
  const categoryCounts = products.reduce<Record<string, number>>((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const uniqueCategories = Object.keys(categoryCounts);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>

      <FormGroup>
        {uniqueCategories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
              />
            }
            label={`${category} (${categoryCounts[category]})`}
          />
        ))}
      </FormGroup>

      {selectedCategories.length > 0 && (
        <Button
          variant="outlined"
          color="primary"
          onClick={onClearFilters}
          style={{ marginTop: "16px" }}
        >
          Remove Filters
        </Button>
      )}
    </div>
  );
};

export default CategoryFilterSidebar;
