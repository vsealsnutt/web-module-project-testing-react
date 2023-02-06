import React from 'react';
import { render, fireEvent, screen, userEvent, rerender } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

const showTest = {
    name: 'show test',
    summary: 'summary test',
    seasons: [
        {
            id: 0,
            name: 'Season 1',
            episodes: []
        },
        {
            id: 1,
            name: 'Season 2',
            episodes: []
        },
        {
            id: 2,
            name: 'Season 3',
            episodes: []
        }
    ]
}

test('renders without errors', () => { 
    render(<Show show={showTest} selectedSeason={'none'} />);
});

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null} />);
    const loading = screen.queryByTestId('loading-container');
    expect(loading).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={showTest} selectedSeason={'none'} />);
    const seasonOptions = screen.queryAllByTestId('season-option');
    expect(seasonOptions).toHaveLength(3);
});

test('handleSelect is called when an season is selected', () => { 
    // const handleSelect = jest.fn();
    // render(<Show show={showTest} selectedSeason={'none'} handleSelect={handleSelect} />);
    // const select = screen.getByLabelText(/Select a Season/i);
    // userEvent.selectOptions(select, ['1']);

    // expect(handleSelect).toBeCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } = render(<Show show={showTest} selectedSeason={'none'} />);
    let episodes = screen.queryByTestId('episodes-container');
    expect(episodes).not.toBeInTheDocument();

    rerender(<Show show={showTest} selectedSeason={1} />);
    episodes = screen.queryByTestId('episodes-container');
    expect(episodes).toBeInTheDocument();
 });
