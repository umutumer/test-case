import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import "./SearchAndSort.scss";
import { useProductStore } from "../../store/productStore";
import { useEffect, useState } from "react";

interface SearchAndSortProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
}
const SearchAndSort: React.FC<SearchAndSortProps> = ({
  setSearchTerm,
  setSortOption,
}) => {
  const productOptions = useProductStore((state) =>
    state.products.map((product) => product.title)
  );
  const { getProducts } = useProductStore();
  const [inputValue, setInputValue] = useState("");
  const [sortValue, setSortValue] = useState("default-sort");

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value);
    setSortValue(event.target.value);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="search-and-sort">
      <Autocomplete
        className="search-input"
        disablePortal
        options={
          inputValue.length >= 2
            ? productOptions.filter((option) =>
                option.toLowerCase().includes(inputValue.toLowerCase())
              )
            : []
        }
        sx={{ width: 300 }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          if (newInputValue.length >= 2) {
            setSearchTerm(newInputValue.toLowerCase());
          } else {
            setSearchTerm("");
          }
        }}
        renderInput={(params) => <TextField {...params} label="Products" />}
      />
      <FormControl style={{ width: 200 , backgroundColor: "white"}}>
        <InputLabel>Sort</InputLabel>
        <Select value={sortValue} label="sort" onChange={handleSortChange}>
          <MenuItem value="default-sort" selected>
            Default Sorting
          </MenuItem>
          <MenuItem value="price-asc">Price: Low to High</MenuItem>
          <MenuItem value="price-desc">Price: High to Low</MenuItem>
          <MenuItem value="name-asc">Name: A-Z</MenuItem>
          <MenuItem value="name-desc">Name: Z-A</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SearchAndSort;
