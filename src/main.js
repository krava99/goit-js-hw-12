import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const formEl = document.querySelector('.form');
const loadMoreBtn = document.querySelector('#load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
const PER_PAGE = 15;

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();

  const inputQuerry = event.currentTarget.elements['search-text'].value.trim();

  if (!inputQuerry) {
    iziToast.warning({
      title: 'Warning',
      message: 'please enter a search query',
    });
    return;
  }

  if (inputQuerry !== currentQuery) {
    currentQuery = inputQuerry;
    currentPage = 1;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const hits = await getImagesByQuery(currentQuery, currentPage);
    totalHits = hits.length > 0 ? PER_PAGE * currentPage : 0;

    if (!hits || hits.length === 0) {
      iziToast.error({
        position: 'topRight',
        message: 'Sorry, there are no images matching your search query!',
      });
      return;
    }

    createGallery(hits);
    currentPage += 1;

    if (hits.length === PER_PAGE) {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      position: 'topRight',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
    formEl.reset();
  }
}

async function onLoadMore() {
  showLoader();
  hideLoadMoreButton();

  try {
    const hits = await getImagesByQuery(currentQuery, currentPage);

    if (!hits || hits.length === 0) {
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
      hideLoadMoreButton();
      return;
    }

    createGallery(hits, true);
    currentPage += 1;

    if (hits.length < PER_PAGE) {
      hideLoadMoreButton();
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      position: 'topRight',
      message: 'Something went wrong while loading more images.',
    });
  } finally {
    hideLoader();
  }
}

function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}
function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}
