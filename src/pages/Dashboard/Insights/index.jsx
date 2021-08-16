import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import { Redirect } from 'react-router-dom';
import Dashboard from '../Dashboard';
import api from '../../../services/api';

const Insights = ({ isPrivate }) => {
  const userData = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const colors = ['#f92962', '#782e74', '#0b7a75', '#0fa9a2', '#fa5b86'];
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [views, setViews] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState(1);

  useEffect(() => {
    async function getInsightsCategory() {
      await api.get('/top-categories')
        .then((res) => {
          if (res.data.length > 0) {
            const dataArr = [['Category', 'Ratio']];
            res.data.map((item) => {
              dataArr.push([item.category_title, item.top]);
            });

            setCategories(dataArr);
          } else {
            setCategories([['Category', 'Ratio']]);
          }
        })
        .catch((err) => {

        });
    }

    async function getInsightsMaterials() {
      await api.get('/top-materials')
        .then((res) => {
          if (res.data.length > 0) {
            const dataArr = [['Material', 'Ratio']];
            res.data.map((item) => {
              dataArr.push([item.material_name, item.top]);
            });

            setMaterials(dataArr);
          } else {
            setMaterials([['Material', 'Ratio']]);
          }
        })
        .catch((err) => {

        });
    }

    async function getInsightsViews() {
      await api.get('/views')
        .then((res) => {
          if (res.data.length > 0) {
            const dataArr = [['Date', 'Views']];
            res.data.map((item) => {
              const date = new Date(item.post_view_date);
              const newDate = `${(date.getMonth() + 1)}-${date.getDate()}-${date.getFullYear()}`;
              dataArr.push([newDate, item.Total]);
            });

            setViews(dataArr);
          } else {
            setViews([['Date', 'Views']]);
          }
        })
        .catch((err) => {

        });
    }

    async function getInsightsLikes() {
      await api.get('/total-likes')
        .then((res) => {
          if (res.data.length > 0) {
            setLikes(res.data[0]);
          } else {
            setLikes({ received: 0, given: 0 });
          }
        })
        .catch((err) => {

        });
    }

    async function getInsightsComments() {
      await api.get('/total-comments')
        .then((res) => {
          if (res.data.length > 0) {
            setComments(res.data[0]);
          } else {
            setComments({ received: 0, given: 0 });
          }
        })
        .catch((err) => {

        });
    }

    getInsightsComments();
    getInsightsLikes();
    getInsightsCategory();
    getInsightsMaterials();
    getInsightsViews();
  }, []);

  if (!userData.session && isPrivate) {
    return (<Redirect to="/" />);
  }

  return (
    <Dashboard nav>
      <div className="insights">

        <div className="insights__box">
          <h3>Top 3 Materials</h3>
          <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={materials}
            options={{
              pieHole: 0.45,
              legend: {
                position: 'bottom',
              },
              colors,
            }}
          />
        </div>

        <div className="insights__box">
          <h3>Top 5 Categories</h3>
          <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={categories}
            options={{
              pieHole: 0.5,
              legend: {
                position: 'bottom',
              },
              colors,
            }}
          />
        </div>

        <div className="insights__box--big">
          <h3>Project Views this Week</h3>
          <Chart
            width="100%"
            height="400px"
            chartType="Line"
            data={views}
            options={{
              curveType: 'function',
              legend: {
                position: 'none',
              },
              series: {
                0: { color: '#f92962' },
              },
            }}
          />
        </div>

        <div className="insights__box">
          <h3>You Have Received (All Time)</h3>
          <p>Project Likes <span>{likes.received}</span></p>
          <p>Comments <span>{comments.received}</span></p>
        </div>

        <div className="insights__box">
          <h3>You Have Given (All Time)</h3>
          <p>Project Likes <span>{likes.given}</span></p>
          <p>Comments <span>{comments.given}</span></p>
        </div>

      </div>
    </Dashboard>
  );
};

export default Insights;
