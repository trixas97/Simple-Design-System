import React, {FC, useEffect, useRef, useState} from "react";
import Text from './../../atoms/Text'

interface SelectOption {
    label: string;
    value: string;
}

interface RenderOptionsProps {
    isSelected: boolean,
    option: SelectOption,
    getOptionRecommendedProps?: (overrideProps?: Object) => Object
}

interface SelectProps {
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
    options?: SelectOption[];
    label?: string;
    renderOption?: (props: RenderOptionsProps) => JSX.Element
}


const Select: FC<SelectProps> = ({onOptionSelected: handler, options = [], label = "Please select an option", renderOption}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number|null>(null)
    const labelRef = useRef<HTMLButtonElement>(null)
    const [overlayTop, setOverlayTop] = useState<number>(0)

    const onOptionClicked = (option: SelectOption, optionIndex: number) => {
        if(handler){
            handler(option, optionIndex)
        }

        setSelectedIndex(optionIndex)
        setIsOpen(false)
    }

    const onLabelClick = () => {
        setIsOpen(prev => !prev)
    }

    useEffect(() => {
        setOverlayTop((labelRef.current?.offsetHeight || 0) + 10)
    },[labelRef.current?.offsetHeight])

    let selectedOption = null

    if(selectedIndex !== null){
        selectedOption = options[selectedIndex]
    }

    return <div className="dse-select">
        <button ref={labelRef} className="dse-select__label" onClick={() => onLabelClick()}>
            <Text>{selectedOption === null ? label : selectedOption.label}</Text>
            <svg width={'1rem'} height={'1rem'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`dse-select__caret ${isOpen ? 'dse-select__caret--open' : 'dse-select__caret--close'} w-6 h-6`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>

        </button>
        {isOpen &&
        <ul style={{top: overlayTop}} className="dse-select__overlay">
            {options.map((option, optionIndex) => {
                const isSelected = selectedIndex === optionIndex;

                const renderOptionProps = {
                    option,
                    isSelected,
                    getOptionRecommendedProps: (overrideProps = {}) => {return {
                        className: `dse-select__option ${isSelected ? 'dse-select__option--selected' : ''}`,
                        onClick: () => onOptionClicked(option, optionIndex),
                        key: option.value,
                        ...overrideProps,
                    }}

                }

                if(typeof renderOption === 'function') {
                    return renderOption(renderOptionProps)
                }
                return (
                    <li className={`dse-select__option ${isSelected ? 'dse-select__option--selected' : ''}`} onClick={() => onOptionClicked(option, optionIndex)} key={option.value}>
                        <Text>{option.label}</Text>
                        {isSelected && 
                            <svg width={'1rem'} height={'1rem'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        }
                    </li>
                )
            })}
        </ul>
        }
    </div>
}

export default Select