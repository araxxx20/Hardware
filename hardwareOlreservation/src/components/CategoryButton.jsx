import React from 'react';
import { Chip } from '@mui/material';
import { AllInclusive, Build, Power, Lightbulb, ElectricBolt, Cable, Category } from '@mui/icons-material';

function CategoryButton({ label, icon, isSelected, onPressed }) {
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'all_inclusive':
        return <AllInclusive />;
      case 'build':
        return <Build />;
      case 'power':
        return <Power />;
      case 'lightbulb':
        return <Lightbulb />;
      case 'electric_bolt':
        return <ElectricBolt />;
      case 'cable':
        return <Cable />;
      default:
        return <Category />;
    }
  };

  return (
    <Chip
      icon={icon ? getIconComponent(icon) : undefined}
      label={label}
      onClick={onPressed}
      variant={isSelected ? 'filled' : 'outlined'}
      sx={{
        minWidth: 'fit-content',
        whiteSpace: 'nowrap',
        borderRadius: '25px',
        padding: '12px 16px',
        fontSize: '13px',
        fontWeight: isSelected ? 600 : 500,
        boxShadow: isSelected ? '0 4px 8px rgba(255, 193, 7, 0.3)' : 'none',
        border: isSelected ? '1px solid #FFC107' : '1px solid rgba(0,0,0,0.23)',
        backgroundColor: isSelected ? '#FFC107' : 'transparent',
        color: isSelected ? '#212121' : 'inherit',
        '&:hover': {
          backgroundColor: isSelected ? '#FFB300' : 'rgba(255, 193, 7, 0.12)',
          borderColor: '#FFB300'
        },
        '& .MuiChip-icon': {
          fontSize: '18px',
          color: isSelected ? '#212121' : 'grey.700'
        }
      }}
    />
  );
}

export default CategoryButton;


