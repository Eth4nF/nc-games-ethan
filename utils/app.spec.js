process.env.NODE_ENV = 'test';
const connection = require('../db/connection');
const request = require('supertest');
const app = require('../app');

afterAll(() => {
  return connection.destroy();
});
beforeEach(() => {
  return connection.seed.run();
});

describe('/api', () => {
  it('ERROR-status 404- returns 404 not found when given unknown path', () => {
    return request(app)
      .get('/xyz')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Sorry, invalid route');
      });
  });
  describe('/categories', () => {
    it('GET- status 200-  returns array of category objects on a key of categories', () => {
      return request(app)
        .get('/api/categories')
        .expect(200)
        .then(({ body: { categories } }) => {
          expect(Array.isArray(categories)).toBe(true);
          expect(Object.keys(categories[0])).toEqual(['slug', 'description']);
        });
    });
    it('ERROR - status 405 - returns invalid method msg', () => {
      const invalidMethods = ['put', 'delete'];

      const requests = invalidMethods.map((method) => {
        return request(app)
          [method]('/api/categories')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('Sorry, method not allowed');
          });
      });
      return Promise.all(requests);
    });
  });
  describe('/users/:username', () => {
    it('GET - status 200 - responds with a user object', () => {
      return request(app)
        .get('/api/users/mallionaire')
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).toEqual({
            username: 'mallionaire',
            name: 'haz',
            avatar_url:
              'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
          });
        });
    });
    it('ERROR - status 404 - responds with user not found for invalid username', () => {
      return request(app)
        .get('/api/users/invaliduser')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Sorry, User not found.');
        });
    });
  });
  describe('/reviews', () => {
    describe('/reviews/:review_id', () => {
      it('GET - status 200 - responds with a review object', () => {
        return request(app)
          .get('/api/reviews/2')
          .expect(200)
          .then(({ body: { review } }) => {
            expect(review.title).toBe('Jenga');
          });
      });
      it('ERROR - status 404 - responds with review not found for invalid review_id', () => {
        return request(app)
          .get('/api/reviews/100')
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(
              "Sorry, could not find the review you're looking for"
            );
          });
      });
      it('ERROR - status 400 - responds with bad request for invalid review_id type', () => {
        return request(app)
          .get('/api/reviews/invalid')
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('Bad request');
          });
      });
      it('PATCH - status 200 - responds with an updated review', () => {
        return request(app)
          .patch('/api/reviews/2')
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body: { review } }) => {
            expect(review.votes).toBe(6);
          });
      });
      it('ERROR - status 400 - responds with bad request for invalid review_id type', () => {
        return request(app)
          .patch('/api/reviews/three')
          .send({ inc_votes: 1 })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('Bad request');
          });
      });
      it('ERROR - status 404 - responds with not found for an invalid review', () => {
        return request(app)
          .patch('/api/reviews/3000')
          .send({ inc_votes: 1 })
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('Sorry, not found');
          });
      });
      it('ERROR - status 400 - responds with bad request for invalid inc_votes type', () => {
        return request(app)
          .patch('/api/reviews/2')
          .send({ inc_votes: 'two' })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('Bad request');
          });
      });
      it('PATCH/ERROR - status 200 - ignores a request where inc_votes is an empty obj', () => {
        return request(app)
          .patch('/api/reviews/3')
          .send({})
          .expect(200)
          .then(({ body: { review } }) => {
            expect(review.votes).toBe(5);
          });
      });
    });
    describe('POST /reviews/:review_id/comments', () => {
      it('POST - status 201 - responds with the newly posted comment', () => {
        return request(app)
          .post('/api/reviews/2/comments')
          .send({
            username: 'bainesface',
            body: "Who's got time to play boardgames?? I've got pottery to do!",
          })
          .expect(201)
          .then(({ body: { comment } }) => {
            const commentKeys = Object.keys(comment);
            expect(commentKeys).toEqual([
              'comment_id',
              'body',
              'author',
              'review_id',
              'votes',
              'created_at',
            ]);
            expect(comment.comment_id).toBe(7);
          });
      });
      it('ERROR - status 422 - responds with unprocessable entity when no request body provided', () => {
        return request(app)
          .post('/api/reviews/2/comments')
          .send({})
          .expect(422)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('Sorry, unprocessable entity');
          });
      });
      it('ERROR - status 404 - responds with not found when given an invalid username', () => {
        return request(app)
          .post('/api/reviews/2/comments')
          .send({ body: 'hello', username: 'invalid-username' })
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('Sorry, not found');
          });
      });
      it('ERROR - status 404 - responds with not found when given an invalid review_id', () => {
        return request(app)
          .post('/api/reviews/2000/comments')
          .send({ body: 'hello', username: 'philippaclaire9' })
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('Sorry, not found');
          });
      });
      it('ERROR - status 422 - responds with unprocessable entity when given null value for body key', () => {
        return request(app)
          .post('/api/reviews/2/comments')
          .send({ body: undefined, username: 'philippaclaire9' })
          .expect(422)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('Sorry, unprocessable entity');
          });
      });
    });
    describe('GET /reviews/:review_id/comments', () => {
      it('GET - status 200 - returns an array of comments for the given review', () => {
        return request(app)
          .get('/api/reviews/3/comments')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments.length).toBe(3);
          });
      });
      it('GET - status 200 - returns an array of comments for the given review sorted by created_at', () => {
        return request(app)
          .get('/api/reviews/3/comments')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments.length).toBe(3);
            expect(comments).toBeSortedBy('created_at', { descending: true });
          });
      });
      it('GET - status 200 - returns an array of comments for the given review sorted by votes', () => {
        return request(app)
          .get('/api/reviews/3/comments?sort_by=votes')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments.length).toBe(3);
            expect(comments).toBeSortedBy('votes', { descending: true });
          });
      });
      it('GET - status 200 - returns an array of comments for the given review sorted by votes in asc order', () => {
        return request(app)
          .get('/api/reviews/3/comments?sort_by=votes&order=asc')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments.length).toBe(3);
            expect(comments).toBeSortedBy('votes', { descending: false });
          });
      });
      it('GET - status 200 - returns an empty array of comments if a review has no comments', () => {
        return request(app)
          .get('/api/reviews/1/comments')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments.length).toBe(0);
          });
      });
      it('ERROR - status 404 - returns not found if the article_id does not exist', () => {
        return request(app)
          .get('/api/reviews/1000/comments')
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(
              "Sorry, could not find the review you're looking for"
            );
          });
      });
      it('ERROR - status 400 - returns bad request if sort_by column does not exist', () => {
        return request(app)
          .get('/api/reviews/3/comments?sort_by=invalid')
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('Bad request');
          });
      });
      it('GET - status 200 - returns comments in default order if order is not asc or desc', () => {
        return request(app)
          .get('/api/reviews/3/comments?order=invalid')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).toBeSorted({ descending: true });
          });
      });
    });
    describe('/reviews', () => {
      describe('GET', () => {
        it('GET - status 200 - returns array of reviews', () => {
          return request(app)
            .get('/api/reviews')
            .expect(200)
            .then(({ body: { reviews } }) => {
              expect(reviews.length).toBe(3);
              expect(reviews[0].comment_count).toBe('3');
            });
        });
        it('GET - status 200 - returns array of reviews sorted by date in descending order', () => {
          return request(app)
            .get('/api/reviews')
            .expect(200)
            .then(({ body: { reviews } }) => {
              expect(reviews).toBeSortedBy('created_at', { descending: true });
            });
        });
        it('GET - status 200 - returns array of reviews sorted by comment_count in descending order', () => {
          return request(app)
            .get('/api/reviews?sort_by=comment_count')
            .expect(200)
            .then(({ body: { reviews } }) => {
              expect(reviews).toBeSortedBy('comment_count', {
                descending: true,
              });
            });
        });
        it('GET - status 200 - returns array of reviews in ascending order', () => {
          return request(app)
            .get('/api/reviews?order=asc')
            .expect(200)
            .then(({ body: { reviews } }) => {
              expect(reviews).toBeSortedBy('created_at', { descending: false });
            });
        });
        it('GET - status 200 - returns array of reviews in filtered by owner', () => {
          return request(app)
            .get('/api/reviews?owner=philippaclaire9')
            .expect(200)
            .then(({ body: { reviews } }) => {
              reviews.forEach((review) => {
                expect(review.owner).toBe('philippaclaire9');
              });
            });
        });
        it('GET - status 200 - returns array of reviews in filtered by category', () => {
          return request(app)
            .get('/api/reviews?category=dexterity')
            .expect(200)
            .then(({ body: { reviews } }) => {
              reviews.forEach((review) => {
                expect(review.category).toBe('dexterity');
              });
            });
        });
        it('ERROR - status 400 - returns bad request when sorting by non-existent column', () => {
          return request(app)
            .get('/api/reviews?sort_by=not-a-column')
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Bad request');
            });
        });
        it('ERROR - status 404 - returns not found when filtering by non-existent owner', () => {
          return request(app)
            .get('/api/reviews?owner=not-an-owner')
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Sorry, User not found.');
            });
        });
        it('ERROR - status 404 - returns not found when filtering by non-existent category', () => {
          return request(app)
            .get('/api/reviews?category=not-an-category')
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Sorry, category not found.');
            });
        });
        it('GET - status 200 - returns empty reviews array with valid author with no reviews', () => {
          return request(app)
            .get('/api/reviews?owner=dav3rid')
            .expect(200)
            .then(({ body: { reviews } }) => {
              expect(reviews.length).toBe(0);
            });
        });
        it('GET - status 200 - returns empty reviews array with valid category with no reviews', () => {
          return request(app)
            .get("/api/reviews?category=children's games")
            .expect(200)
            .then(({ body: { reviews } }) => {
              expect(reviews.length).toBe(0);
            });
        });
      });
      describe('POST', () => {
        it('POST - status 200 - posts a new review', () => {
          return request(app)
            .post('/api/reviews')
            .send({
              title: 'Monotony',
              designer: 'Leslie Scott',
              owner: 'philippaclaire9',
              review_body: "There's nothing else to do at the moment",
              category: 'euro game',
            })
            .expect(201)
            .then(({ body: { review } }) => {
              expect(review.review_id).toBe(4);
            });
        });
        it('ERROR - status 422 - responds with unprocessable entity if review information is missing from the request', () => {
          return request(app)
            .post('/api/reviews')
            .send({})
            .expect(422)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Sorry, unprocessable entity');
            });
        });
        it('ERROR - status 400 - does not post a review, when extra keys are attached to the request body', () => {
          return request(app)
            .post('/api/reviews')
            .send({
              title: 'Monotony',
              designer: 'Leslie Scott',
              owner: 'philippaclaire9',
              review_body: "There's nothing else to do at the moment",
              category: 'euro game',
              porridge: 'only bears like porridge',
            })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Bad request');
            });
        });
        it('ERROR - status 400 - does not post a review, when category does not exist', () => {
          return request(app)
            .post('/api/reviews')
            .send({
              title: 'Monotony',
              designer: 'Leslie Scott',
              owner: 'philippaclaire9',
              review_body: "There's nothing else to do at the moment",
              category: 'invalid game',
            })
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Sorry, not found');
            });
        });
        it('ERROR - status 400 - does not post a review, when owner does not exist', () => {
          return request(app)
            .post('/api/reviews')
            .send({
              title: 'Monotony',
              designer: 'Leslie Scott',
              owner: 'philipaclaire9',
              review_body: "There's nothing else to do at the moment",
              category: 'invalid game',
            })
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Sorry, not found');
            });
        });
      });
    });
    describe('/comments/:comment_id', () => {
      describe('PATCH', () => {
        it('PATCH - status 200 - responds with an updated vote count on a comment', () => {
          return request(app)
            .patch('/api/comments/3')
            .send({ inc_votes: 1 })
            .expect(200)
            .then(({ body: { comment } }) => {
              expect(comment.votes).toBe(11);
            });
        });
        it('PATCH - status 200 - responds with an updated vote count on a comment, works with negative values', () => {
          return request(app)
            .patch('/api/comments/3')
            .send({ inc_votes: -1 })
            .expect(200)
            .then(({ body: { comment } }) => {
              expect(comment.votes).toBe(9);
            });
        });
        it('PATCH - status 200 - does not update the vote count on a comment when no inc_votes is attached to the body', () => {
          return request(app)
            .patch('/api/comments/3')
            .send({})
            .expect(200)
            .then(({ body: { comment } }) => {
              expect(comment.votes).toBe(10);
            });
        });
        it('ERROR - status 404 - responds with not found for a non-existent comment ', () => {
          return request(app)
            .patch('/api/comments/1000')
            .send({ inc_votes: 1 })
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Sorry, not found');
            });
        });
        it('ERROR - status 404 - responds with not found for a non-existent comment type', () => {
          return request(app)
            .patch('/api/comments/invalid-type')
            .send({ inc_votes: 1 })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Bad request');
            });
        });
        it('ERROR - status 400 - responds with bad request if inc_votes is NaN', () => {
          return request(app)
            .patch('/api/comments/2')
            .send({ inc_votes: 'porridge' })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Bad request');
            });
        });
      });
      describe('DELETE', () => {
        it('DELETE - status 204 - returns no content when comment is deleted', () => {
          return request(app)
            .delete('/api/comments/2')
            .expect(204)
            .then(() => {
              console.log('hellooooo');
              return request(app)
                .delete('/api/comments/2')
                .expect(404)
                .then(({ body: { msg } }) => {
                  expect(msg).toBe('Could not delete comment');
                });
            });
        });
        it('ERROR - status 404 - returns could not delete comment if comment does not exist', () => {
          return request(app)
            .delete('/api/comments/2000')
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Could not delete comment');
            });
        });
        it('ERROR - status 400 - returns bad request if given wrong comment type', () => {
          return request(app)
            .delete('/api/comments/porridge')
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Bad request');
            });
        });
      });
    });
  });
});