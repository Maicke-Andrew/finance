import { useEffect, useState } from "react";
import Select from 'react-select';
import flagEN from "/en_flag.png";
import flagPT from "/pt_flag.png";
import { useTranslation } from "react-i18next";

const LanguageDropdown = () => {
    const { t, i18n } = useTranslation()
    const [selectedOption, setSelectedOption] = useState<{
        value: string;
        label: string;
    } | null>(null);

    const options = [
        { value: "pt", label: "PT", icon: flagPT },
        { value: "en", label: "EN", icon: flagEN },
    ];

    useEffect(() => {
        const lng = window.localStorage.getItem('language') || 'pt';
        const option = options.find(o => o.value === lng) || options[0];
        setSelectedOption(option);
    }, [])

    useEffect(() => {
        const foundOption = options.find((option) => option.value === i18n.language);
        setSelectedOption(foundOption ? foundOption : null);
      }, [i18n.language]);

    const handleChange = (selectedOption: { value: string; label: string; } | null) => {
        setSelectedOption(selectedOption);
        localStorage.setItem("language", selectedOption?.value ?? "");
        i18n.changeLanguage(selectedOption?.value)
    };

    const formatOptionLabel = (option: any) => (
        <div style={{ display: "flex", alignItems: "center" }}>
            <img src={option.icon} alt="" style={{ marginRight: 5, width: 24 }} />
            {option.label}
        </div>
    );

    return (
        <Select
            options={options}
            value={selectedOption}
            onChange={handleChange}
            isSearchable={false}
            getOptionLabel={(option) => option.label}
            formatOptionLabel={formatOptionLabel}
            styles={{
                option: (styles, { data }) => ({
                    ...styles,
                    display: "flex",
                    alignItems: "center",
                    padding: "1px 2px", // ajuste o espaçamento aqui
                    cursor: "pointer",
                    overflow: 'hidden',
                    minWidth: 80,
                    maxWidth: 80
                }),
                control: (styles) => ({
                    ...styles,
                    minWidth: 120,
                    maxWidth: 120,
                    overflow: 'hidden',
                    borderRadius: 4,
                    // border: "none",
                    boxShadow: "none",
                    cursor: 'pointer'
                }),
                dropdownIndicator: (styles) => ({
                    ...styles,
                    color: "#555",
                    "&:hover": {
                        color: "#222",
                    },
                    width: '99% !important'
                }),
                indicatorsContainer: (styles) => ({
                    ...styles,
                    width: '30% !important'
                }),
                menu: (styles) => ({
                    ...styles,
                    minWidth: 120,
                    maxWidth: 120,
                    marginTop: 39
                }),
            }}
            menuPlacement="auto" // ajuste o posicionamento aqui
        />
    );
};

export default LanguageDropdown;