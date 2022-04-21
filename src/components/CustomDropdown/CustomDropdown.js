import React, { useContext } from "react";
import Select, { components } from "react-select";
import { requestTranslation } from '@sangre-fp/i18n'
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import './CustomDropdown.css'
import { DataContext } from '../../store/GlobalState';
import { ACTIONS } from '../../store/Actions';
const customStyles = {
  container: (base) => ({
    ...base,
    width: 144,
    height: 28,
    cursor: 'pointer'
  }),
  control: (base) => ({
    ...base,
    height: 36,
    minHeight: 36,
    marginBottom: 2,
    cursor: 'pointer'
  }),
  menu: (base, propsOptipons) => {
    return {
      ...base,
      cursor: 'pointer'
      // height: 36,
      // minHeight: 36,
      // marginBottom: 2,
    }
  },
  option: (base, propsOptipons) => {
    const  {isSelected, isFocused} = propsOptipons

    // const isSelectedOptions = selectedOptions?.
    const customOptionsStyles = {
      ...base,
      // backgroundColor:  (isSelected && isFocused) ? 'rgba(0,126,255,.08)' : 'white',
      backgroundColor:  ( isFocused) ? 'rgba(0,126,255,.08)' : 'white',
      color: 'black',
      cursor: 'pointer',
      ':hover' : {
        backgroundColor: (isFocused) ? 'rgba(0,126,255,.08)' : 'white',
        cursor: 'pointer'
      },
      ':active' : {
        ...base[':active'],
        backgroundColor: (isSelected) ? 'rgba(0,126,255,.08)' : 'white',
        cursor: 'pointer'
      },
      '&:focus' : {
        ...base[':focus'],
        backgroundColor:  (isFocused) ? 'rgba(0,126,255,.08)' : 'white',
        cursor: 'pointer'
      }, 
    }
    return customOptionsStyles
  }
};
const CustomDropdown = ({name, defaultOptionsProps, selectedOptionsProps, options, dropdownIsOpen, openDropdownHandle, closeDropdownHandle, lang}) => {
  const {dispatch } = useContext(DataContext)
  
  //take first object from array in dropdown
  // let firstOption = options.slice(0,1).shift()

  const DropdownDownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <ArrowDropDown onClick={openDropdownHandle} style={{cursor: 'pointer'}} />
      </components.DropdownIndicator>
    );
  };

  const DropdownUpIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <ArrowDropUp onClick={openDropdownHandle} style={{cursor: 'pointer'}}/>
      </components.DropdownIndicator>
    );
  };
  const onInputChange = (props, methods) => {
    if (methods.action === "menu-close") closeDropdownHandle();
  };

  const onChange = (e) => {
    const value = e

    if (name === 'modes') {
      //dispatch
      dispatch({
        type: ACTIONS.MODE,
        payload: value?.key
      })
    } else {
      dispatch({
        type: ACTIONS.AVGMEDIAN,
        payload: value?.key
      })
    }
  }
// radar?.radarLanguage === "en" ? 'Median' : 'Mediaani'
  let tempSelectedOptions = null
  if ( name === 'modes') {
    if( selectedOptionsProps === 1) {
      tempSelectedOptions = {
        label: lang === "en" ? 'Absolute' : 'Tarkka',
        value: 1,
        key: 1
      }
    } else if( selectedOptionsProps === 2) {
      tempSelectedOptions = {
        label: lang === "en" ? 'Dispersed' : 'Hajautettu',
        value: 2,
        key: 2
      }
    } else {
      tempSelectedOptions = {
        label: 'Relative Mode',
        value: 3,
        key: 3
      }
    }
  } else {
    if(selectedOptionsProps === 1) {
      tempSelectedOptions = {
        label: lang === "en" ? 'Average' : 'Keskiarvo',
        value: 1,
        key: 1
      }
    } else {
      tempSelectedOptions = {
        label: lang === "en" ? 'Median' : 'Mediaani',
        value: 2,
        key: 2
      }
    }
  }
  
  return (
    <div style={{position: 'relative'}}>
      <button onClick={openDropdownHandle} style={{cursor:'pointer', zIndex: 99, background: 'transparent', width: '100%', height: '100%', position: 'absolute'}}>
      </button>
      <Select
        styles={customStyles}
        classNamePrefix="react-select-rating-results"
        placeholder={requestTranslation("selectValue")}
        searchable={false}
        name="group"
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: dropdownIsOpen
            ? DropdownUpIndicator
            : DropdownDownIndicator,
        }}
        className="custom-react-select-height-att custom-react-select-width-att"
        onInputChange={onInputChange}
        defaultValue={{...tempSelectedOptions}}
        options={options.map((val) => ({
            label: val.labelEn,
            value: val.value,
            key: val.value
          }))}
        clearable={false}
        isSearchable={false}
        menuIsOpen={dropdownIsOpen}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomDropdown;
