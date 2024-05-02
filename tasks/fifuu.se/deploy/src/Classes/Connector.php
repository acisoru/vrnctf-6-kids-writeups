<?php
    /*
     * Uguu
     *
     * @copyright Copyright (c) 2022-2024 Go Johansson (nokonoko) <neku@pomf.se>
     *
     * Note that this was previously distributed under the MIT license 2015-2022.
     *
     * If you are a company that wants to use Uguu I urge you to contact me to
     * solve any potential license issues rather then using pre-2022 code.
     *
     * A special thanks goes out to the open source community around the world
     * for supporting and being the backbone of projects like Uguu.
     *
     * This project can be found at <https://github.com/nokonoko/Uguu>.
     *
     * This program is free software: you can redistribute it and/or modify
     * it under the terms of the GNU General Public License as published by
     * the Free Software Foundation, either version 3 of the License, or
     * (at your option) any later version.
     *
     * This program is distributed in the hope that it will be useful,
     * but WITHOUT ANY WARRANTY; without even the implied warranty of
     * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     * GNU General Public License for more details.
     *
     * You should have received a copy of the GNU General Public License
     * along with this program.  If not, see <https://www.gnu.org/licenses/>.
     */
    
    namespace Pomf\Uguu\Classes;
    
    use PDO;
    
    class Connector extends Database
    {
        public PDO $DB;
        public string $dbType;
        public array $CONFIG;
        public Response $response;
        
        public function errorHandler(int $errno, string $errstr):void
        {
            if ($this->CONFIG['DEBUG']) {
                $this->response->error(500, 'Server error: ' . $errstr);
            } else {
                $this->response->error(500, 'Server error.');
            }
        }
        
        public function fatalErrorHandler():void
        {
            if (!is_null($e = error_get_last())) {
                if ($this->CONFIG['DEBUG']) {
                    $this->response->error(500, 'FATAL Server error: ' . print_r($e, true));
                } else {
                    $this->response->error(500, 'Server error.');
                }
            }
        }
        
        /**
         * Reads the config.json file and populates the CONFIG property with the settings
         * Also assembles the PDO DB connection and registers error handlers.
         *
         */
        public function __construct()
        {
            $this->response = new Response('json');
            if (!file_exists(__DIR__ . '/../config.json')) {
                $this->response->error(500, 'Cant read settings file.');
            }
            $this->CONFIG = json_decode(
               file_get_contents(__DIR__ . '/../config.json'),
               true,
            );
            ini_set('display_errors', 0);
            set_error_handler([$this, "errorHandler"]);
            register_shutdown_function([$this, "fatalErrorHandler"]);
            $this->dbType = $this->CONFIG['DB_MODE'];
            $this->DB = new PDO(
               $this->CONFIG['DB_MODE'] . ':' . $this->CONFIG['DB_PATH'],
               $this->CONFIG['DB_USER'],
               $this->CONFIG['DB_PASS'],
            );
        }
    }