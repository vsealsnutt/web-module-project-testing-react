import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

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

test('renders without errors with no props', async () => { 
    render(<Display />);
});

test('renders Show component when the button is clicked ', async () => { 
    mockFetchShow.mockResolvedValueOnce(showTest);

    render(<Display />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const show = await screen.findByTestId('show-container');
    expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async () => { 
    mockFetchShow.mockResolvedValueOnce(showTest);

    render(<Display />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option');
        expect(seasonOptions).toHaveLength(3);
    })
});

test('displayFunc is called when the button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(showTest);
    const displayFunc = jest.fn();

    render(<Display displayFunc={displayFunc} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled();
    })
});
