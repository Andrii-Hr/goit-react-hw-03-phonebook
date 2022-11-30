import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ filter, change }) => (
  <label className={css.label}>
    Find contacts by name
    <input
      className={css.input}
      type="text"
      name="filter"
      value={filter}
      onChange={change}
    />
  </label>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};
export default Filter;
