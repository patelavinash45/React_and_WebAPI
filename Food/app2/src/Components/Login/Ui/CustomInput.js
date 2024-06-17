import { memo } from "react";
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";

const CustomInput = ({ field, ...props }) => {
    return (
        <FormControl sx={{ pb: '15px' }}>
            <InputLabel htmlFor={props.label} error={props.isValid} >
                {props.label}
            </InputLabel>
            <OutlinedInput
                {...field}
                name={props.label.toLowerCase()}
                error={props.isValid}
                id={props.label}
                type={props.type}
                label={props.label}
                startAdornment={
                    <InputAdornment position="start">
                        {props.startAdornment}
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="start">
                        {props.endAdornment}
                    </InputAdornment>
                }
            />
            {
                props.isValid
                && <span className="text-danger mx-2">
                    {props.errorMessage}
                </span>
            }
        </FormControl>
    );
};

export default memo(CustomInput);