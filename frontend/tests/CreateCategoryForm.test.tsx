import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreateCategoryForm from '../src/components/CreateCategoryForm';

vi.mock('../src/api/category', () => ({
  createCategory: vi.fn(),
}));

import { createCategory } from '../src/api/category';

describe('CreateCategoryForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form fields', () => {
    render(<CreateCategoryForm onCreated={() => {}} />);

    expect(screen.getByPlaceholderText(/code/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add category/i })).toBeInTheDocument();
  });

  it('calls createCategory with form data and then calls onCreated', async () => {
    const onCreated = vi.fn();

    vi.mocked(createCategory).mockResolvedValue(undefined);

    render(<CreateCategoryForm onCreated={onCreated} />);

    fireEvent.change(screen.getByPlaceholderText(/code/i), { target: { value: 'TEST' } });
    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'Test Category' } });
    fireEvent.change(screen.getByPlaceholderText(/type/i), { target: { value: 'Optional' } });

    fireEvent.click(screen.getByRole('button', { name: /add category/i }));

    await waitFor(() => {
      expect(createCategory).toHaveBeenCalledTimes(1);
      expect(onCreated).toHaveBeenCalledTimes(1);
    });

    expect(createCategory).toHaveBeenCalledWith({
      code: 'TEST',
      name: 'Test Category',
      type: 'Optional',
    });

    expect(screen.getByPlaceholderText(/code/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/name/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/type/i)).toHaveValue('');
  });

  it('shows alert on failure and does not call onCreated', async () => {
    const onCreated = vi.fn();

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    vi.mocked(createCategory).mockRejectedValue(new Error('boom'));

    render(<CreateCategoryForm onCreated={onCreated} />);

    fireEvent.change(screen.getByPlaceholderText(/code/i), { target: { value: 'TEST' } });
    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'Test Category' } });

    fireEvent.click(screen.getByRole('button', { name: /add category/i }));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Failed to create category');
    });

    expect(onCreated).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });
});