#!/usr/bin/python3
"""
Unit Test for Place Class
"""
import unittest
from datetime import datetime
import models
import json

Place = models.place.Place
BaseModel = models.base_model.BaseModel


class TestPlaceDocs(unittest.TestCase):
    """Class for testing BaseModel docs"""

    @classmethod
    def setUpClass(cls):
        print('\n\n.................................')
        print('..... Testing Documentation .....')
        print('........   Place Class   ........')
        print('.................................\n\n')

    def test_doc_file(self):
        """... documentation for the file"""
        expected = '\nPlace Class from Models Module\n'
        actual = models.place.__doc__
        self.assertEqual(expected, actual)

    def test_doc_class(self):
        """... documentation for the class"""
        expected = 'Place class handles all application places'
        actual = Place.__doc__
        self.assertEqual(expected, actual)

    def test_doc_init(self):
        """... documentation for init function"""
        expected = 'instantiates a new place'
        actual = Place.__init__.__doc__
        self.assertEqual(expected, actual)


class TestPlaceInstances(unittest.TestCase):
    """testing for class instances"""

    @classmethod
    def setUpClass(cls):
        print('\n\n.................................')
        print('....... Testing Functions .......')
        print('.........  Place Class  .........')
        print('.................................\n\n')

    def test_instantiation(self):
        """... checks if Place is properly instantiated"""
        my_place = Place()
        self.assertIsInstance(my_place, Place)

    def test_to_string(self):
        """... checks if BaseModel is properly casted to string"""
        my_place = Place()
        my_str = str(my_place)
        my_list = ['Place', 'id', 'created_at']
        actual = 0
        for sub_str in my_list:
            if sub_str in my_str:
                actual += 1
        self.assertTrue(3 == actual)

    def test_instantiation_no_updated(self):
        """... should not have updated attribute"""
        my_place = Place()
        my_str = str(my_place)
        actual = 0
        if 'updated_at' in my_str:
            actual += 1
        self.assertTrue(0 == actual)

    def test_updated_at(self):
        """... save function should add updated_at attribute"""
        my_place = Place()
        my_place.save()
        actual = type(my_place.updated_at)
        expected = type(datetime.now())
        self.assertEqual(expected, actual)

    def test_to_json(self):
        """... to_json should return serializable dict object"""
        my_place = Place()
        my_place_json = my_place.to_json()
        actual = 1
        try:
            serialized = json.dumps(my_place_json)
        except:
            actual = 0
        self.assertTrue(1 == actual)

    def test_json_class(self):
        """... to_json should include class key with value Place"""
        my_place = Place()
        my_place_json = my_place.to_json()
        actual = None
        if my_place_json['__class__']:
            actual = my_place_json['__class__']
        expected = 'Place'
        self.assertEqual(expected, actual)

    def test_email_attribute(self):
        """... add email attribute"""
        my_place = Place()
        my_place.max_guest = 3
        if hasattr(my_place, 'max_guest'):
            actual = my_place.max_guest
        else:
            actual = ''
        expected = 3
        self.assertEqual(expected, actual)

if __name__ == '__main__':
    unittest.main